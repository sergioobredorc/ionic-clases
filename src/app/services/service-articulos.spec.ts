import { TestBed } from '@angular/core/testing';

import { ServiceArticulos } from './service-articulos';

describe('ServiceArticulos', () => {
  let service: ServiceArticulos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceArticulos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
