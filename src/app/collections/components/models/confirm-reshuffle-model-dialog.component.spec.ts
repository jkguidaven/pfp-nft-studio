import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmReshuffleModelDialogComponent } from './confirm-reshuffle-model-dialog.component';

describe('ConfirmReshuffleModelDialogComponent', () => {
  let component: ConfirmReshuffleModelDialogComponent;
  let fixture: ComponentFixture<ConfirmReshuffleModelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmReshuffleModelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmReshuffleModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
