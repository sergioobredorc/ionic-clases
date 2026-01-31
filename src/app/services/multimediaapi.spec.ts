import { TestBed } from '@angular/core/testing';

import { Multimediaapi } from './multimediaapi';

describe('Multimediaapi', () => {
  let service: Multimediaapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Multimediaapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
