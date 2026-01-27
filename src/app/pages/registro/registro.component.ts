import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonInput, IonSelect, IonSelectOption, IonDatetime, IonToggle,
  IonTextarea, IonCheckbox, IonButton, IonText
} from '@ionic/angular/standalone';

import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
    IonInput, IonSelect, IonSelectOption, IonDatetime, IonToggle,
    IonTextarea, IonCheckbox, IonButton, IonText
  ]
})
export class RegistroComponent {

  form: FormGroup;
  enviado = false;
  guardadoOK = false;

  constructor(private fb: FormBuilder, private storageSvc: StorageService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      disponible: [true],
      descripcion: [''],
      confirmar: [false, Validators.requiredTrue]
    });
  }

  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    this.enviado = true;
    this.guardadoOK = false;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    await this.storageSvc.addRegistro(this.form.value);
    this.guardadoOK = true;
    this.form.reset({ disponible: true });
  }
}
