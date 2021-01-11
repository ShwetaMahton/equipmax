import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistLogTableComponent } from './checklist-log-table.component';

describe('ChecklistLogTableComponent', () => {
  let component: ChecklistLogTableComponent;
  let fixture: ComponentFixture<ChecklistLogTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistLogTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistLogTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
