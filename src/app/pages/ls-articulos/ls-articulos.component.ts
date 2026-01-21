import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-ls-articulos',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './ls-articulos.component.html',
  styleUrls: ['./ls-articulos.component.scss']
})
export class LsArticulosComponent {

  articulos:any[] = [];

  constructor(
    private storage: StorageService,
    private nav: NavController
  ){
    this.cargar();
  }

  async cargar(){
    this.articulos = await this.storage.obtener();
  }

  async borrarTodo(){
    await this.storage.borrarTodo();
    this.cargar();
  }

  volver(){
    this.nav.navigateRoot('/articulos');
  }
}
