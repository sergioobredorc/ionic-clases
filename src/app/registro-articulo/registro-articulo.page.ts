import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators,  } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonDatetime, IonToggle, IonTextarea, IonCheckbox, IonButton, IonText } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ServiceArticulos } from '../services/service-articulos';


@Component({
  selector: 'app-registro-articulo',
  templateUrl: './registro-articulo.page.html',
  styleUrls: ['./registro-articulo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonSelect, IonSelectOption, IonDatetime, IonToggle, IonTextarea, IonCheckbox, IonButton, IonText, RouterModule, ReactiveFormsModule, IonItem, IonLabel]
})
export class RegistroArticuloPage implements OnInit {

  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false;

  constructor(
    private fb: FormBuilder,
    private serviceArticulos: ServiceArticulos,
    private router: Router
  ) { 

    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      disponibilidad: [true],
      descripcion: [''],
      confirmacion: [false, [Validators.requiredTrue]]
    });
  }

  get f(){
    return this.registroForm.controls;
  }

  async onSubmit() {
    this.enviado = true;
    this.guardadoOK = false;

    if(this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      return;
    }

    await this.serviceArticulos.addRegistro(this.registroForm.value);
    this.guardadoOK = true;

    this.registroForm.reset({
      disponibilidad: true,
      confirmacion: false
    });
  }

  ngOnInit() {}
}
