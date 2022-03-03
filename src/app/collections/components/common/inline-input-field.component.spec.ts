import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineInputFieldComponent } from './inline-input-field.component';

describe('InlineInputFieldComponent', () => {
  let component: InlineInputFieldComponent;
  let fixture: ComponentFixture<InlineInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
