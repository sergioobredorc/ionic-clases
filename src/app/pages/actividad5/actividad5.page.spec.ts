import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actividad5Page } from './actividad5.page';

describe('Actividad5Page', () => {
  let component: Actividad5Page;
  let fixture: ComponentFixture<Actividad5Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Actividad5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
