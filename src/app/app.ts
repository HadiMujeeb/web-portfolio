import { Component } from '@angular/core';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Education } from './components/education/education';
import { Experience } from './components/experience/experience';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Projects } from './components/projects/projects';
import { Resume } from './components/resume/resume';
import { Skills } from './components/skills/skills';
import { Starfield } from './components/starfield/starfield';

@Component({
  selector: 'app-root',
  imports: [Starfield, Navbar, Hero, About, Skills, Experience, Projects, Education, Resume, Contact, Footer],
  host: { class: 'block' },
  templateUrl: './app.html',
})
export class App {}
