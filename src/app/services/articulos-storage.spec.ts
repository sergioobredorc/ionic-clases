import { TestBed } from '@angular/core/testing';

import { ArticulosStorageService } from 'src/app/services/articulos-storage';


describe('ArticulosStorage', () => {
  let service: ArticulosStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
