import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLayerFormComponent } from './edit-layer-form.component';

describe('EditLayerFormComponent', () => {
  let component: EditLayerFormComponent;
  let fixture: ComponentFixture<EditLayerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLayerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
