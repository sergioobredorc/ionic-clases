import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validator, ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,IonLabel,IonInput,IonSelect,IonSelectOption, IonDatetime,IonRadio,IonRadioGroup,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText,} from '@ionic/angular/standalone';

import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,IonLabel,IonInput,IonSelect,IonSelectOption, IonDatetime,IonRadio,IonRadioGroup,IonToggle,IonTextarea,IonCheckbox,IonCheckbox,IonButton,IonText, CommonModule,ReactiveFormsModule],
  standalone: true
})
export class RegistroComponent{
  enviado = false;
  guardadoOK = false;
  registroForm: FormGroup;
  constructor( private fb: FormBuilder, private storageSvc: StorageService, private router: Router) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required,Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      pais: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      notificaciones: [true],
      biografia: ['', Validators.maxLength(200)],
      terminos: [false, Validators.requiredTrue]
    })
  }
  get f(){
    return this.registroForm.controls;

  }

  async onSubmit(){
    
    this.enviado = true;
    this.guardadoOK = false;

    if (this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      return;
    }
    await this.storageSvc.addRegistro(this.registroForm.value);
    this.guardadoOK = true;
    this.router.navigate(["/registros"]); // lo agregue aca en vez del html porque aunque el formulario no estuviran llenos se dirigia a la pagina de listado de registros y obvimante no debia pasar esto y aja pense y dije bueno creo que esto debe ir en el ts y asi fue jajaja
    this.registroForm.reset();// coloque esto porque despues de guardar el registro y volver al formulario salian los campos ya llenos con la informacion anterior 
  }
  ngOnInit() {}

}
