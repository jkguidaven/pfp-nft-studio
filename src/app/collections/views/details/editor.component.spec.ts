import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionEditorViewComponent } from './editor.component';

describe('CollectionEditorViewComponent', () => {
  let component: CollectionEditorViewComponent;
  let fixture: ComponentFixture<CollectionEditorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionEditorViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
