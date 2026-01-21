import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticulosRegistradosPage } from './articulos-registrados.page';

describe('ArticulosRegistradosPage', () => {
  let component: ArticulosRegistradosPage;
  let fixture: ComponentFixture<ArticulosRegistradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosRegistradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
