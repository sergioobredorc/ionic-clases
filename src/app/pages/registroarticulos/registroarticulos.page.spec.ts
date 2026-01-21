import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroarticulosPage } from './registroarticulos.page';

describe('RegistroarticulosPage', () => {
  let component: RegistroarticulosPage;
  let fixture: ComponentFixture<RegistroarticulosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroarticulosPage] 
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroarticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
