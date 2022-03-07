import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTraitFormComponent } from './edit-trait-form.component';

describe('EditLayerFormComponent', () => {
  let component: EditTraitFormComponent;
  let fixture: ComponentFixture<EditTraitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTraitFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTraitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
