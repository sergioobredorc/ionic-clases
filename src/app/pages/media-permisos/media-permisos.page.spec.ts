import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaPermisosPage } from './media-permisos.page';

describe('MediaPermisosPage', () => {
  let component: MediaPermisosPage;
  let fixture: ComponentFixture<MediaPermisosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPermisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
