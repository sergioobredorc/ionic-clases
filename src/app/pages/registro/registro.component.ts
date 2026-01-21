import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegistroComponent {
  usuarioForm: FormGroup;
  mensajeExito: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private storageSvc: StorageService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      pais: ['', [Validators.required]],
      genero: ['masculino'],
      biografia: ['']
    });
  }

  async guardarUsuario() {
    if (this.usuarioForm.valid) {
      await this.storageSvc.addRegistro(this.usuarioForm.value);
      this.mensajeExito = true;
      this.usuarioForm.reset({ genero: 'masculino' });
      
      setTimeout(() => {
        this.mensajeExito = false;
        this.router.navigate(['/registros']);
      }, 1500);
    }
  }
}