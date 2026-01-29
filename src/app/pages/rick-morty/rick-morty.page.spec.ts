import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RickMortyPage } from './rick-morty.page';

describe('RickMortyPage', () => {
  let component: RickMortyPage;
  let fixture: ComponentFixture<RickMortyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RickMortyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
