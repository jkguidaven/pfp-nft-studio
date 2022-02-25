import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionCardLoaderComponent } from './collection-card-loader.component';

describe('CollectionCardLoaderComponent', () => {
  let component: CollectionCardLoaderComponent;
  let fixture: ComponentFixture<CollectionCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionCardLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
