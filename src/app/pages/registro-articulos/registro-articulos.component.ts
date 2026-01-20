import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItem,
  IonInput,
  IonDatetime,
  IonList,
  IonText,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonSelect,
  IonCheckbox,
  IonToggle,
} from '@ionic/angular/standalone';
import { StorageService } from 'src/app/service/storage2.service';

@Component({
  selector: 'app-registro-articulos',
  standalone: true,
  templateUrl: './registro-articulos.component.html',
  styleUrls: ['./registro-articulos.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel,
    IonItem,
    IonInput,
    CommonModule,
    ReactiveFormsModule,
    IonDatetime,
    IonList,
    IonText,
    IonSelectOption,
    IonTextarea,
    IonButton,
    IonSelect,
    IonCheckbox,
    IonToggle,
  ],
})
export class RegistroArticulosComponent {
  registroForm: FormGroup;
  guardadoOK = false;
  enviado = false;
  constructor(
    private fb: FormBuilder,
    private storageSvs: StorageService,
    private router: Router,
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      categoria: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      descripcion: ['', [Validators.maxLength(200)]],
      disponibilidad: [true],
      confirmar: [false, [Validators.requiredTrue]],
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

    await this.storageSvs.addArticulo(this.registroForm.value);
    this.guardadoOK = true;

    setTimeout(() => {
      this.router.navigate(['/listados']);
    }, 1000);
  }
}
