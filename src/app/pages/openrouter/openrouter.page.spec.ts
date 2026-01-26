import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenrouterPage } from './openrouter.page';

describe('OpenrouterPage', () => {
  let component: OpenrouterPage;
  let fixture: ComponentFixture<OpenrouterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenrouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
