import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitVariantItemComponent } from './trait-variant-item.component';

describe('TraitVariantItemComponent', () => {
  let component: TraitVariantItemComponent;
  let fixture: ComponentFixture<TraitVariantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TraitVariantItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitVariantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
