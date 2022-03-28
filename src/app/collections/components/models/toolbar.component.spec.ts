import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelToolbarComponent } from './toolbar.component';

describe('ModelToolbarComponent', () => {
  let component: ModelToolbarComponent;
  let fixture: ComponentFixture<ModelToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
