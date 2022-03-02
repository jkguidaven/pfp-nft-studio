import { Component, Input, OnInit } from '@angular/core';

export interface SideNavMenuItem {
  label: string;
  icon: string;
  link: string | string[];
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() menuItems!: SideNavMenuItem[];

  constructor() {}

  ngOnInit(): void {}
}
