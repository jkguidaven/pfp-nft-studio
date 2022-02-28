import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition(':enter, :leave', [animate('300ms ease-out')]),
]);

export const expand = trigger('expand', [
  state('void', style({ opacity: 0, transform: 'scale(0)' })),
  state('*', style({ opacity: 1, transform: 'scale(1)' })),
  transition(':enter, :leave', [animate('100ms ease-out')]),
]);
