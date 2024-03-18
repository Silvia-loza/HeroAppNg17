import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirm-dialog.component';

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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heros/list']);

        this.heroForm.reset(hero);
        return;
      });
  }

  saveHero() {
    console.log('form is valid', {
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value,
    });
    if (!this.heroForm.valid) return;
    if (this.currentHero.id) {
      this.heroesService
        .updateHero(<Hero>this.heroForm.value)
        .subscribe((hero) => {
          this.showSnackbsar(`${hero.superhero} saved`);
          console.log('Hero saved', this.heroForm.value);
        });
      return;
    }
    this.heroesService.addHero(<Hero>this.heroForm.value).subscribe((hero) => {
      console.log('Hero saved', this.heroForm.value);
      this.router.navigate(['/heros/edit', hero.id]);
      this.showSnackbsar(`${hero.superhero} created`);
      this.heroForm.reset();
    });
  }
  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero id is required');

    const DialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    DialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe((result) => {
        this.router.navigate(['/heros/list']);
        this.showSnackbsar(`${this.currentHero.superhero} deleted`);
      });
  }

  showSnackbsar(message: string): void {
    this.snackBar.open(message, 'ok', { duration: 2500 });
  }

  openDialog() {
    this.dialog;
  }
}
