import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraymicroPage } from './camaraymicro.page';

describe('CamaraymicroPage', () => {
  let component: CamaraymicroPage;
  let fixture: ComponentFixture<CamaraymicroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CamaraymicroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
