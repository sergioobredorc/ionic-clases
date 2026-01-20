import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validator,ReactiveFormsModule,FormGroup, Validators,} from '@angular/forms';
import { IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
  IonSelectOption,IonDatetime,IonRadio,IonRadioGroup,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText, IonFooter} from '@ionic/angular/standalone';

import { StorageService } from 'src/app/services/storage.service';
import { Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [IonHeader,CommonModule,ReactiveFormsModule,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
  IonSelectOption,IonDatetime,IonRadio,IonRadioGroup,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText, ReactiveFormsModule, RouterLink, IonFooter]
})
export class RegistroComponent {

  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false; 

  constructor(private fb: FormBuilder, private storageSvc: StorageService, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      correo: ['', [Validators.required,Validators.email]],
      pais: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      notificaciones: [true],
      biografia: ['', [Validators.maxLength(200)]],
      terminos: [false, [Validators.requiredTrue]]
    })
   }

   get f(){
    return this.registroForm.controls; 
   }
  
   async onSubmit(){
    this.enviado = true; 

    if (this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      console.log("FALTA RELLENAR CAMPOS OBLIGATORIOS.")
      return;
    }
    
    await this.storageSvc.addRegistro(this.registroForm.value);
    this.guardadoOK = true;
    this.router.navigate(['/listado-registros']);
   }

}
