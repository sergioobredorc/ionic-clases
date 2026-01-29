import { TestBed } from '@angular/core/testing';

import { AiSentiment } from './ai-sentiment';

describe('AiSentiment', () => {
  let service: AiSentiment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSentiment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
