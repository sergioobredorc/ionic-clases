import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { ToastController } from '@ionic/angular';

import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonItem, IonLabel, IonInput, IonText, 
  IonSelect, IonSelectOption, 
  IonDatetime, IonDatetimeButton, IonModal, 
  IonToggle, IonTextarea, IonCheckbox, IonButton 
} from '@ionic/angular/standalone';

import { StorageService, Articulo } from '../../services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterLink, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonItem, IonLabel, IonInput, IonText, 
    IonSelect, IonSelectOption, 
    IonDatetime, IonDatetimeButton, IonModal, 
    IonToggle, IonTextarea, IonCheckbox, IonButton
  ]
})
export class RegistroComponent implements OnInit {
  
  articleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
      activo: [true],
      descripcion: [''],
      confirmacion: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.articleForm.valid) {
      const nuevoArticulo: Articulo = this.articleForm.value;
      await this.storageService.addArticle(nuevoArticulo);
      this.presentToast('Artículo registrado exitosamente');
      
      this.articleForm.reset({ 
        activo: true, 
        confirmacion: false,
        fecha: new Date().toISOString()
      });

      this.router.navigate(['/registros']);
    } else {
      this.presentToast('Por favor verifica los campos obligatorios');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}