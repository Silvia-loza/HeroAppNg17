import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
})
export class HeroCardComponent implements OnInit {
  @Input() hero!: Hero;
  heroCharacters: string[] = [];
  ngOnInit(): void {
    if (!this.hero) throw Error('Hero is required to use the card!');
    const rawCharacters = this.hero.characters.split(',');
    this.heroCharacters = rawCharacters.slice(0, 3);
  }
}
