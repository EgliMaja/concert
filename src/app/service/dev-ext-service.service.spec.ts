import { TestBed } from '@angular/core/testing';

import { DevExtServiceService } from './dev-ext-service.service';

describe('DevExtServiceService', () => {
  let service: DevExtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevExtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
