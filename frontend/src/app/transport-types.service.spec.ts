import { TestBed } from '@angular/core/testing';

import { TransportTypesService } from './transport-types.service';

describe('TransportTypesService', () => {
  let service: TransportTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
