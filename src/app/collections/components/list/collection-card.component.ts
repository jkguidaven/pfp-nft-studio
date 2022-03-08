import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: [],
})
export class CollectionCardComponent implements OnInit {
  @Input() thumbnail!: string | undefined;
  @Input() name!: string;
  @Input() description!: string;
  @Input() highlight!: boolean;

  @Output() remove = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() select = new EventEmitter();

  menuTopLeftPosition = { x: '0', y: '0' };

  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  onContextMenu($event: MouseEvent): void {
    $event.preventDefault();

    this.select.emit();
    this.menuTopLeftPosition.x = $event.clientX + 'px';
    this.menuTopLeftPosition.y = $event.clientY + 'px';
    this.matMenuTrigger.openMenu();
  }

  getSafeUrl(url: string | undefined): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url || '');
  }
}
