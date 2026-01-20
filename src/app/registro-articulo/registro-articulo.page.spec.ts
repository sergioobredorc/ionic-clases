import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroArticuloPage } from './registro-articulo.page';

describe('RegistroArticuloPage', () => {
  let component: RegistroArticuloPage;
  let fixture: ComponentFixture<RegistroArticuloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroArticuloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
