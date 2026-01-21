import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
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
import { ArticulosStorageService } from 'src/app/services/articulos-storage';

@Component({
  selector: 'app-registro-articulos',
  standalone: true,
  templateUrl: './formulario-articulos.component.html',
  styleUrls: ['./formulario-articulos.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
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
export class RegistroArticulosComponent{
  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false;

  constructor(
    private fb: FormBuilder,
    private articulosSvc: ArticulosStorageService
  ) {
    this.registroForm = this.fb.group({

       nombre: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],

      precio: [
        null,
        [Validators.required, Validators.min(1)]
      ],

      categoria: [
        null,
        Validators.required
      ],

      fechaIngreso: [
        null,
        Validators.required
      ],

      disponible: [
        true
      ],

      descripcion: [
        ''
      ],

      confirmado: [
        false,
        Validators.requiredTrue
      ]
    });
  }

  get f() {
    return this.registroForm.controls;
  }

  async onSubmit() {
    this.enviado = true;
    this.guardadoOK = false;

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    await this.articulosSvc.addArticulo(this.registroForm.value);

    this.guardadoOK = true;
    this.registroForm.reset({
      disponible: true,
      confirmado: false
    });
  }
}