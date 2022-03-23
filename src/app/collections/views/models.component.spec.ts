import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionModelsViewComponent } from './models.component';

describe('CollectionModelsViewComponent', () => {
  let component: CollectionModelsViewComponent;
  let fixture: ComponentFixture<CollectionModelsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionModelsViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionModelsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
