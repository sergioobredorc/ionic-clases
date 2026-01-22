import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonToggle,
  IonTextarea,
  IonCheckbox,
  IonButton,
  IonText
} from '@ionic/angular/standalone';

import { ArticulosStorageService } from '../../services/articulos-storage.service';

@Component({
  selector: 'app-registro-articulo',
  standalone: true,
  templateUrl: './registro-articulo.component.html',
  styleUrls: ['./registro-articulo.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonToggle,
    IonTextarea,
    IonCheckbox,
    IonButton,
    IonText
  ]
})
export class RegistroArticuloComponent {

  articuloForm: FormGroup;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private articuloSvc: ArticulosStorageService
  ) {
    this.articuloForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      disponible: [true],
      descripcion: [''],
      confirmar: [false, [Validators.requiredTrue]]
    });
  }

  get f() {
    return this.articuloForm.controls;
  }

  async guardar() {
    this.enviado = true;

    if (this.articuloForm.invalid) {
      this.articuloForm.markAllAsTouched();
      return;
    }

    await this.articuloSvc.addArticulo(this.articuloForm.value);

    this.articuloForm.reset({
      disponible: true,
      confirmar: false
    });

    this.enviado = false;
  }
}
