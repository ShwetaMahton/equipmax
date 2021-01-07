import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTableIndexComponent } from './asset-table-index.component';

describe('AssetTableIndexComponent', () => {
  let component: AssetTableIndexComponent;
  let fixture: ComponentFixture<AssetTableIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetTableIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTableIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
