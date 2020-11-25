import { TestBed } from '@angular/core/testing';

import { DataitempoolService } from './dataitempool.service';

describe('DataitempoolService', () => {
  let service: DataitempoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataitempoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
