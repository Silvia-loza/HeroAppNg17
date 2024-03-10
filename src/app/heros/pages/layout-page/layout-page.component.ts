import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``,
})
export class LayoutPageComponent {
  public sidebarItems = [
    { id: 1, label: 'listado', icon: 'label', route: './list' },
    { id: 2, label: 'add', icon: 'add', route: './new-hero' },
    { id: 3, label: 'Search', icon: 'search', route: './search' },
  ];
}
