import { TestBed } from '@angular/core/testing';

import { ArticulosStorage } from './articulos-storage';

describe('ArticulosStorage', () => {
  let service: ArticulosStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
