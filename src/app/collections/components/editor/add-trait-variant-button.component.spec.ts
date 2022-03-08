import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTraitVariantButtonComponent } from './add-trait-variant-button.component';

describe('AddTraitVariantButtonComponent', () => {
  let component: AddTraitVariantButtonComponent;
  let fixture: ComponentFixture<AddTraitVariantButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTraitVariantButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTraitVariantButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
