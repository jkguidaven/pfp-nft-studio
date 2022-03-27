import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionDetailsViewComponent } from './details.component';

describe('CollectionDetailsViewComponent', () => {
  let component: CollectionDetailsViewComponent;
  let fixture: ComponentFixture<CollectionDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionDetailsViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
