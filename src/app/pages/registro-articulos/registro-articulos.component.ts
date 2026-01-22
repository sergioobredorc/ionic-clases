import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonToggle, IonTextarea, IonCheckbox, IonButton, IonText } from '@ionic/angular/standalone';

import { ArticulosService } from '../../services/articulos.service';

@Component({
  selector: 'app-registro-articulos',
  standalone: true,
  templateUrl: './registro-articulos.component.html',
  styleUrls: ['./registro-articulos.component.scss'],
  imports: [
    IonHeader, CommonModule, ReactiveFormsModule, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonToggle, IonTextarea, IonCheckbox, IonButton, IonText
  ]
})
export class RegistroArticulosComponent {
  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false;

  categorias = [
    { id: 'electronica', label: 'Electrónica' },
    { id: 'ropa', label: 'Ropa' },
    { id: 'alimentos', label: 'Alimentos' },
    { id: 'libros', label: 'Libros' },
    { id: 'otros', label: 'Otros' }
  ];

  constructor(private fb: FormBuilder, private articulosSvc: ArticulosService, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      categoria: [null, [Validators.required]],
      fechaIngreso: [null, [Validators.required]],
      disponibilidad: [true],
      descripcion: [''],
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

    await this.articulosSvc.addArticulo(this.registroForm.value);
    this.guardadoOK = true;

    // Redirigir a la página de artículos después de 1 segundo
    setTimeout(() => {
      this.router.navigate(['/articulos']);
    }, 1000);
  }
}
