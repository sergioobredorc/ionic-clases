import { TestBed } from '@angular/core/testing';

import { Apii } from './apii';

describe('Apii', () => {
  let service: Apii;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apii);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
