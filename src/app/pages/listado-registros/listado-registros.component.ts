import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular'; 
import { Articulo, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-listado-registros',
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonicModule]
})
export class ListadoRegistrosComponent implements OnInit {
  
  articles: Articulo[] = []; 
  
  constructor(
    private storageSvc: StorageService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    await this.cargarRegistros();
  }

  async ionViewWillEnter() {
    await this.cargarRegistros();
  }

  async cargarRegistros(){
    this.articles = await this.storageSvc.getArticles();
  }


  async borrarTodo() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro?',
      message: 'Esta acción borrará todos los artículos permanentemente.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Sí, borrar todo',
          handler: async () => {
            await this.storageSvc.clearArticles();
            this.articles = [];
          }
        }
      ]
    });
    await alert.present();
  }
}