import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssetTableComponent } from './dialog-asset-table.component';

describe('DialogAssetTableComponent', () => {
  let component: DialogAssetTableComponent;
  let fixture: ComponentFixture<DialogAssetTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssetTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
