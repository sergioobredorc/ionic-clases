import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodiosPage } from './episodios.page';

describe('EpisodiosPage', () => {
  let component: EpisodiosPage;
  let fixture: ComponentFixture<EpisodiosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodiosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
