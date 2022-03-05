import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerVariantItemComponent } from './layer-variant-item.component';

describe('LayerVariantItemComponent', () => {
  let component: LayerVariantItemComponent;
  let fixture: ComponentFixture<LayerVariantItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayerVariantItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerVariantItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
