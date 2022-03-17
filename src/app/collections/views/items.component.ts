import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  gotToEditor() {
    const id = this.activatedRoute.snapshot.parent?.params['id'];

    if (id) {
      this.router.navigate(['/collections', id, 'editor']);
    }
  }
}
