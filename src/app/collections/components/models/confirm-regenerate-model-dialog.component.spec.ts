import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegenerateModelDialogComponent } from './confirm-regenerate-model-dialog.component';

describe('ConfirmRegenerateModelDialogComponent', () => {
  let component: ConfirmRegenerateModelDialogComponent;
  let fixture: ComponentFixture<ConfirmRegenerateModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegenerateModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRegenerateModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
