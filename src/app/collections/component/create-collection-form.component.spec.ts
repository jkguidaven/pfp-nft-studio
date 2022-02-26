import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectionFormComponent } from './create-collection-form.component';

describe('CreateCollectionFormComponent', () => {
  let component: CreateCollectionFormComponent;
  let fixture: ComponentFixture<CreateCollectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCollectionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
