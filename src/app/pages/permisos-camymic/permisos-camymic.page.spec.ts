import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisosCamymicPage } from './permisos-camymic.page';

describe('PermisosCamymicPage', () => {
  let component: PermisosCamymicPage;
  let fixture: ComponentFixture<PermisosCamymicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosCamymicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
