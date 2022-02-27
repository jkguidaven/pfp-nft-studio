import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverPhotoSelectorComponent } from './cover-photo-selector.component';

describe('CoverPhotoSelectorComponent', () => {
  let component: CoverPhotoSelectorComponent;
  let fixture: ComponentFixture<CoverPhotoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverPhotoSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverPhotoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
