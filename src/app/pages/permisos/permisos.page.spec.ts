import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisosPage } from './permisos.page';

describe('PermisosPage', () => {
  let component: PermisosPage;
  let fixture: ComponentFixture<PermisosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
