import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodesGraphqlPage } from './episodes-graphql.page';

describe('EpisodesGraphqlPage', () => {
  let component: EpisodesGraphqlPage;
  let fixture: ComponentFixture<EpisodesGraphqlPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodesGraphqlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
