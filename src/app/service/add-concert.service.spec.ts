import { TestBed } from '@angular/core/testing';

import { concertService } from './add-concert.service';

describe('concertService', () => {
  let service: concertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(concertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
