import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonIcon, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonText 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, refreshOutline } from 'ionicons/icons';
import { StorageService, Registro } from '../../services/storage.service';

@Component({
  selector: 'app-listado-registros',
  standalone: true,
  templateUrl: './listado-registros.component.html',
  styleUrls: ['./listado-registros.component.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
    IonIcon, IonCard, IonCardHeader, IonCardTitle, 
    IonCardSubtitle, IonCardContent, IonText, CommonModule
  ]
})
export class ListadoRegistrosComponent implements OnInit {
  registros: Registro[] = [];
  cargando: boolean = false;

  constructor(private storageSvc: StorageService) {
    addIcons({ trashOutline, refreshOutline });
  }

  async ngOnInit() {
    await this.cargar();
  }

  async cargar() {
    this.cargando = true;
    this.registros = await this.storageSvc.getRegistros();
    setTimeout(() => { this.cargando = false; }, 500);
  }

  async borrarTodo() {
    await this.storageSvc.clearRegistros();
    await this.cargar();
  }
}