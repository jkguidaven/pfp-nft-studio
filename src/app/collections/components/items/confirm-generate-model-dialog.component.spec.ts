import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmGenerateModelDialogComponent } from './confirm-generate-model-dialog.component';

describe('ConfirmGenerateModelDialogComponent', () => {
  let component: ConfirmGenerateModelDialogComponent;
  let fixture: ComponentFixture<ConfirmGenerateModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmGenerateModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmGenerateModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
