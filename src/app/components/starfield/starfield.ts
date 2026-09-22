import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  ViewChild,
  inject,
} from '@angular/core';

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  /** 0 = far background (blurred, barely reacts), 2 = foreground (crisp, reacts most) */
  layer: 0 | 1 | 2;
  bright: boolean;
  twinkleSpeed: number;
  twinklePhase: number;
  /** current spring displacement from its resting position, and its velocity */
  dx: number;
  dy: number;
  vx: number;
  vy: number;
}

/** How strongly each depth layer parallaxes with the cursor / idle drift. */
const LAYER_PARALLAX: readonly [number, number, number] = [0.12, 0.38, 1];
const INTERACT_RADIUS = 150;
const GLOW_RADIUS = 85;
const MAX_PUSH = 24;
const SPRING = 0.1;
const DAMPING = 0.86;

/**
 * Cinematic, cursor-reactive starfield rendered behind the whole portfolio.
 *
 * Two canvases give it depth cheaply: the back one holds small, dim,
 * CSS-blurred stars that barely move; the front one holds the brighter
 * foreground stars, which get the cursor glow and react most to the pointer.
 * Everything runs on requestAnimationFrame outside Angular's zone so it
 * never triggers change detection, and it's paused for `prefers-reduced-motion`,
 * hidden tabs, and idles smoothly back to rest when the pointer stops.
 */
@Component({
  selector: 'app-starfield',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <!-- static, ultra-low-opacity glows: cheap ambient depth, no per-frame cost -->
      <div class="absolute -top-1/4 left-1/3 w-[900px] h-[900px] rounded-full bg-white/[0.025] blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-white/[0.02] blur-3xl"></div>
      <canvas #bgCanvas class="absolute inset-0 w-full h-full blur-[0.5px]"></canvas>
      <canvas #fgCanvas class="absolute inset-0 w-full h-full"></canvas>
    </div>
  `,
})
export class Starfield implements AfterViewInit {
  @ViewChild('bgCanvas', { static: true }) private bgCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fgCanvas', { static: true }) private fgCanvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  private bgCtx!: CanvasRenderingContext2D;
  private fgCtx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private dpr = 1;

  private stars: Star[] = [];
  /** Pointer position in CSS px, and a 0–1 "how much is it currently moving" value. */
  private pointer = { x: -9999, y: -9999, active: 0 };
  private isTouch = false;
  private reducedMotion = false;
  private rafId = 0;
  private startTime = 0;
  private resizeTimeout?: ReturnType<typeof setTimeout>;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.bgCtx = this.bgCanvasRef.nativeElement.getContext('2d')!;
    this.fgCtx = this.fgCanvasRef.nativeElement.getContext('2d')!;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;

    this.resize();

    this.zone.runOutsideAngular(() => {
      this.bindEvents();
      if (this.reducedMotion) {
        this.drawStatic();
      } else {
        this.startTime = performance.now();
        this.rafId = requestAnimationFrame(this.loop);
      }
    });
  }

  private bindEvents(): void {
    let lastX = -9999;
    let lastY = -9999;

    const onPointerMove = (x: number, y: number): void => {
      const speed = Math.min(Math.hypot(x - lastX, y - lastY), 45);
      lastX = x;
      lastY = y;
      this.pointer.x = x;
      this.pointer.y = y;
      this.pointer.active = Math.min(1, this.pointer.active + speed * 0.035);
    };

    const pointerMove = (e: PointerEvent): void => onPointerMove(e.clientX, e.clientY);
    const pointerLeave = (): void => {
      this.pointer.x = -9999;
      this.pointer.y = -9999;
    };

    window.addEventListener('pointermove', pointerMove, { passive: true });
    window.addEventListener('pointerleave', pointerLeave, { passive: true });
    window.addEventListener('pointercancel', pointerLeave, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibility);

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.rafId);
      clearTimeout(this.resizeTimeout);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('pointerleave', pointerLeave);
      window.removeEventListener('pointercancel', pointerLeave);
      window.removeEventListener('resize', this.onResize);
      document.removeEventListener('visibilitychange', this.onVisibility);
    });
  }

  private onResize = (): void => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resize();
      if (this.reducedMotion) this.drawStatic();
    }, 150);
  };

  private onVisibility = (): void => {
    if (document.hidden) {
      cancelAnimationFrame(this.rafId);
    } else if (!this.reducedMotion) {
      this.rafId = requestAnimationFrame(this.loop);
    }
  };

  private resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    const bgCanvas = this.bgCanvasRef.nativeElement;
    bgCanvas.width = this.width * this.dpr;
    bgCanvas.height = this.height * this.dpr;
    this.bgCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const fgCanvas = this.fgCanvasRef.nativeElement;
    fgCanvas.width = this.width * this.dpr;
    fgCanvas.height = this.height * this.dpr;
    this.fgCtx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.generateStars();
  }

  private generateStars(): void {
    const area = this.width * this.height;
    const densityDivisor = this.isTouch ? 11000 : 8600;
    const cap = this.isTouch ? 150 : 260;
    const count = Math.max(70, Math.min(cap, Math.round(area / densityDivisor)));

    this.stars = Array.from({ length: count }, () => {
      const roll = Math.random();
      const layer: 0 | 1 | 2 = roll < 0.55 ? 0 : roll < 0.85 ? 1 : 2;
      const bright = layer === 2 && Math.random() < 0.2;
      const [rMin, rMax] = layer === 0 ? [0.5, 1.1] : layer === 1 ? [0.8, 1.5] : [1.2, 2.1];
      const [aMin, aMax] = layer === 0 ? [0.15, 0.45] : layer === 1 ? [0.3, 0.6] : [0.55, 0.95];

      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: rMin + Math.random() * (rMax - rMin),
        baseAlpha: aMin + Math.random() * (aMax - aMin),
        layer,
        bright,
        twinkleSpeed: 0.15 + Math.random() * 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        dx: 0,
        dy: 0,
        vx: 0,
        vy: 0,
      };
    });
  }

  private loop = (now: number): void => {
    const t = (now - this.startTime) / 1000;
    // decays every frame; only pointermove tops it up, so motion fades
    // smoothly to zero — and with it the pull on nearby stars — the moment
    // the cursor stops, matching the requested "ease back to rest".
    this.pointer.active *= 0.94;

    // Touch devices have no hover cursor, so give them a very slow,
    // barely-there autonomous drift instead (per-layer, so it still reads as depth).
    const driftX = this.isTouch ? Math.sin(t * 0.08) * 4 : 0;
    const driftY = this.isTouch ? Math.cos(t * 0.065) * 3 : 0;

    this.bgCtx.clearRect(0, 0, this.width, this.height);
    this.fgCtx.clearRect(0, 0, this.width, this.height);

    const activePointer = this.pointer.active > 0.01;

    for (const star of this.stars) {
      const parallax = LAYER_PARALLAX[star.layer];
      let targetDx = driftX * parallax;
      let targetDy = driftY * parallax;

      if (activePointer) {
        const ox = star.x - this.pointer.x;
        const oy = star.y - this.pointer.y;
        const dist = Math.hypot(ox, oy);
        if (dist < INTERACT_RADIUS && dist > 0.01) {
          const strength = (1 - dist / INTERACT_RADIUS) ** 2 * this.pointer.active * parallax;
          targetDx += (ox / dist) * strength * MAX_PUSH;
          targetDy += (oy / dist) * strength * MAX_PUSH;
        }
      }

      // critically-damped spring: eases toward the target, no overshoot/bounce
      star.vx = (star.vx + (targetDx - star.dx) * SPRING) * DAMPING;
      star.vy = (star.vy + (targetDy - star.dy) * SPRING) * DAMPING;
      star.dx += star.vx;
      star.dy += star.vy;

      const twinkle = Math.sin(t * star.twinkleSpeed + star.twinklePhase) * 0.22;
      let alpha = Math.min(1, Math.max(0, star.baseAlpha + twinkle));
      let radius = star.r;

      const drawX = star.x + star.dx;
      const drawY = star.y + star.dy;
      const ctx = star.layer === 2 ? this.fgCtx : this.bgCtx;

      // subtle glow when a foreground star is close to the cursor
      if (star.layer === 2 && this.pointer.x > -1000) {
        const dist = Math.hypot(drawX - this.pointer.x, drawY - this.pointer.y);
        if (dist < GLOW_RADIUS) {
          const proximity = 1 - dist / GLOW_RADIUS;
          alpha = Math.min(1, alpha + proximity * 0.35);
          radius = star.r + proximity * 1.2;
          const glowR = 14 + proximity * 10;
          const glow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowR);
          glow.addColorStop(0, `rgba(255,255,255,${proximity * 0.25})`);
          glow.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(drawX, drawY, glowR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (star.bright) {
        const haloR = radius * 5;
        const halo = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, haloR);
        halo.addColorStop(0, `rgba(255,255,255,${alpha * 0.35})`);
        halo.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(drawX, drawY, haloR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    this.rafId = requestAnimationFrame(this.loop);
  };

  /** Single static frame for prefers-reduced-motion: no drift, no twinkle, no rAF loop. */
  private drawStatic(): void {
    this.bgCtx.clearRect(0, 0, this.width, this.height);
    this.fgCtx.clearRect(0, 0, this.width, this.height);
    for (const star of this.stars) {
      const ctx = star.layer === 2 ? this.fgCtx : this.bgCtx;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${star.baseAlpha})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
