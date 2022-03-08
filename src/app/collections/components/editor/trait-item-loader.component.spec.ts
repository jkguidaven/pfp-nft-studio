import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitItemLoaderComponent } from './trait-item-loader.component';

describe('TraitItemLoaderComponent', () => {
  let component: TraitItemLoaderComponent;
  let fixture: ComponentFixture<TraitItemLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraitItemLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitItemLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
