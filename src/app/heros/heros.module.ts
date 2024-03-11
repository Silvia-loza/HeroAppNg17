import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/heroImage.pipe';

@NgModule({
  declarations: [
    HeroPageComponent,
    ListPageComponent,
    LayoutPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroCardComponent,
  ],
  imports: [CommonModule, HerosRoutingModule, MaterialModule, HeroImagePipe],
})
export class HerosModule {}
