import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from 'src/app/store/models/collection';

@Component({
  selector: 'app-collection-header',
  templateUrl: './collection-header.component.html',
  styleUrls: ['./collection-header.component.scss'],
})
export class CollectionHeaderComponent implements OnInit {
  @Input() collection?: Collection;
  @Output() back: EventEmitter<void> = new EventEmitter<any>();

  constructor(public router: Router) {}

  ngOnInit(): void {}
}
