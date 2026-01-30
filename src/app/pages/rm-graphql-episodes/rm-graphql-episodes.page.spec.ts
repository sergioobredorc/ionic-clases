import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RmGraphqlEpisodesPage } from './rm-graphql-episodes.page';

describe('RmGraphqlEpisodesPage', () => {
  let component: RmGraphqlEpisodesPage;
  let fixture: ComponentFixture<RmGraphqlEpisodesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RmGraphqlEpisodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
