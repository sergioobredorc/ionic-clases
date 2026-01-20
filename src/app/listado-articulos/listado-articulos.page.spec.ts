import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoArticulosPage } from './listado-articulos.page';

describe('ListadoArticulosPage', () => {
  let component: ListadoArticulosPage;
  let fixture: ComponentFixture<ListadoArticulosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoArticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
