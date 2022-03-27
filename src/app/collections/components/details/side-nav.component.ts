import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface SideNavMenuItem {
  label: string;
  icon: string;
  link: string | string[];
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: [],
})
export class SideNavComponent implements OnInit {
  @Input() menuItems!: SideNavMenuItem[];

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
