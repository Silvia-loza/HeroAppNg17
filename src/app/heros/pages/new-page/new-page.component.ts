import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public publishers = [
    { id: 'Dc Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  constructor(private heroesService: HeroesService) {}
  ngOnInit(): void {}

  saveHero() {
    console.log('form is valid', {
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
    });
    if (this.heroForm.valid) {
      this.heroesService.addHero(<Hero>this.heroForm.value).subscribe(() => {
        console.log('Hero saved', this.heroForm.value);
        this.heroForm.reset();
      });
    }
  }
}
