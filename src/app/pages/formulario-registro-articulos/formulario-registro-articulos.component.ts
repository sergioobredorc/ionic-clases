import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
  IonSelectOption,IonDatetime,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

import { StorageVentasService } from '../../services/storage_ventas.service';

@Component({
  selector: 'app-formulario-registro-articulos',
  templateUrl: './formulario-registro-articulos.component.html',
  styleUrls: ['./formulario-registro-articulos.component.scss'],
  imports: [IonHeader,CommonModule,ReactiveFormsModule,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
    IonSelectOption,IonDatetime,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText,IonSelect,IonSelectOption, RouterLink
  ],
  standalone: true
})
export class FormularioRegistroArticulosComponent  {
  formularioArticulo: FormGroup;
  enviado = false;
  guardadoOK = false;

  constructor( private fb: FormBuilder, private storage: StorageVentasService) {
    this.formularioArticulo = this.fb.group({
     nombreArticulo: ['',[Validators.required,Validators.minLength(3)]],
     precioArticulo: ['',[Validators.required,Validators.min(0)]],
     categoriaArticulo: [null,[Validators.required]],
     fechaIngreso: [null,[Validators.required]],
     disponibilidadArticulo: [false],
     confirmacionRegistro: [false, [Validators.requiredTrue]], 
     descripcionArticulo: ['',[Validators.maxLength(200)]],   
   })
  }

  get f(){
    return this.formularioArticulo.controls;
  }

  async onSubmit() {
    this.enviado = true;
    this.guardadoOK = false;

    if(this.formularioArticulo.invalid){
      this.formularioArticulo.markAllAsTouched();
      return;
    }

    await this.storage.addRegistro(this.formularioArticulo.value);
    this.guardadoOK = true;
    this.enviado = false;
    this.formularioArticulo.reset();
  }

}
