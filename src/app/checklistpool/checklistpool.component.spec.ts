import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistpoolComponent } from './checklistpool.component';

describe('ChecklistpoolComponent', () => {
  let component: ChecklistpoolComponent;
  let fixture: ComponentFixture<ChecklistpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistpoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
