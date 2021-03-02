import { TestBed } from '@angular/core/testing';

import { MovementsApiClient } from './movements-api-client.service';

describe('MovementsApiClientService', () => {
  let service: MovementsApiClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementsApiClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
