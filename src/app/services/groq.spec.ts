import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroqService } from './groq';

describe('GroqService', () => {
  let service: GroqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroqService]
    });
    service = TestBed.inject(GroqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});