import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'listado', icon: 'label', route: './list' },
    { label: 'add', icon: 'add', route: './new-hero' },
    { label: 'Search', icon: 'search', route: './search' },
  ];
}
