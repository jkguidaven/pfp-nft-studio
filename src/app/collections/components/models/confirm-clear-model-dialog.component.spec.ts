import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmClearModelDialogComponent } from './confirm-clear-model-dialog.component';

describe('ConfirmClearModelDialogComponent', () => {
  let component: ConfirmClearModelDialogComponent;
  let fixture: ComponentFixture<ConfirmClearModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmClearModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmClearModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
