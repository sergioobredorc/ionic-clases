import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect,
  IonSelectOption, IonDatetime, IonTextarea, IonCheckbox, IonButton, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';



import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-formulario-articulos',
  standalone: true,
  templateUrl: './formulario-articulos.component.html',
  styleUrls: ['./formulario-articulos.component.scss'],
  imports: [
    IonHeader, CommonModule, ReactiveFormsModule, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime,
    IonTextarea, IonCheckbox, IonButton, IonText, RouterLink
  ]
})
export class FormularioArticulosComponent {
  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false;

  constructor(
    private fb: FormBuilder,
    private storageSvc: StorageService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre_articulo: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      disponibilidad: [null, [Validators.required]],
      descripcion: ['', [Validators.maxLength(200)]],
      confirmacion: [false, [Validators.requiredTrue]]
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

    await this.storageSvc.addArticulo(this.registroForm.value);
    this.guardadoOK = true;

    this.router.navigate(['sales/listado-articulos']);
  }
}
