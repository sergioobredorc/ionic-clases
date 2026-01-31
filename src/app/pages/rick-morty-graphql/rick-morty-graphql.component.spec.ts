import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RickMortyGraphqlComponent } from './rick-morty-graphql.component';

describe('RickMortyGraphqlComponent', () => {
  let component: RickMortyGraphqlComponent;
  let fixture: ComponentFixture<RickMortyGraphqlComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RickMortyGraphqlComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RickMortyGraphqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
