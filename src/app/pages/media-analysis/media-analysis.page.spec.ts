import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaAnalysisPage } from './media-analysis.page';

describe('MediaAnalysisPage', () => {
  let component: MediaAnalysisPage;
  let fixture: ComponentFixture<MediaAnalysisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAnalysisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
