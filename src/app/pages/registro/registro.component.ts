import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonLabel,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonToggle,
  IonTextarea,
  IonCheckbox,
  IonText,
  IonButton
} from '@ionic/angular/standalone'

import { StorageArticuloService } from 'src/app/services/storageArticulo.service';


@Component({
  selector: 'app-registro-articulo',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonLabel,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonToggle,
    IonTextarea,
    IonCheckbox,
    CommonModule,
    IonText,
    IonButton,
    ReactiveFormsModule,
    RouterLink

  ]
})
export class RegistroArticuloComponent {

  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false;
  constructor(private fb: FormBuilder, private storageSvc: StorageArticuloService, private router: Router ) {
    this.registroForm = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(3)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      categoria: [null,[Validators.required]],
      fechaIngreso: [null,[Validators.required]],
      disponibilidad: [true],
      descripcion: ['', [Validators.maxLength(150)]],
      confirmacion: [false, [Validators.requiredTrue]]
    })
    
  }

  get f(){
    return this.registroForm.controls;
  }

  async onSubmit() {
    this.enviado = true;

    if(this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      return;
    }
    await this.storageSvc.grabar(this.registroForm.value);
    this.guardadoOK = true;
    this.router.navigate(['/listado-articulos']);
    
    
  }
}
