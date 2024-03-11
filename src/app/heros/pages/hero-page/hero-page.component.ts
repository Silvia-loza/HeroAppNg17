import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``,
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  public loading: boolean = true;
  constructor(
    private HeroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.HeroesService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['heros/list']);
        this.hero = hero;
        return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl('heros/list');
  }
}
