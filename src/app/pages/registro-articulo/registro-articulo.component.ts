import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators }  from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList,IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonCheckbox, IonButton, IonText, IonButtons } from '@ionic/angular/standalone';
import { RegistroArticulo, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-registro-articulo',
  standalone: true,
  templateUrl: './registro-articulo.component.html',
  styleUrls: ['./registro-articulo.component.scss'],
  imports: [IonButtons, IonHeader, CommonModule, ReactiveFormsModule,IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonTextarea, IonCheckbox, IonButton, IonText, RouterModule
  ]
})

export class RegistroArticuloComponent  {
  registroArticuloForm: FormGroup;
  enviado = false
  guardadoOK = false;

  constructor(private fb: FormBuilder, private storageService: StorageService, private router: Router, private alertController: AlertController) {
    this.registroArticuloForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      categoria: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      disponibilidad: [true, [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      confirmacion: [false, [Validators.requiredTrue]]
    })
  }

  get fa() {
    return this.registroArticuloForm.controls;
  }

  async onSubmitProduct() {
    this.enviado = true;
    this.guardadoOK = false;

    if (this.registroArticuloForm.invalid) {
      this.registroArticuloForm.markAllAsTouched();
      return;
    }

    const articulo: Omit<RegistroArticulo, 'createdAt'> = this.registroArticuloForm.value;
    await this.storageService.addRegistroArticulo(articulo);

    this.guardadoOK = true;
    this.registroArticuloForm.reset({
      disponibilidad: false,
      confirmacion: false
    });

    const alert = await this.alertController.create({
      header: 'Articulo Registrado',
      message: '¡El artículo ha sido guardado!. Serás redirigido al listado de artículos.',
      buttons: [
        { text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/listado-articulos']);
          }
        }
      ]
    });
    await alert.present();
  }
}
