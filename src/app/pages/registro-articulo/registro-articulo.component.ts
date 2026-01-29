import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-articulo',
  standalone: true,
  templateUrl: './registro-articulo.component.html',
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class RegistroArticuloComponent {
  articuloForm: FormGroup;
  guardadoOK: boolean = false;

  constructor(private fb: FormBuilder, private storageSvc: StorageService, private router: Router) { 
    this.articuloForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', [Validators.required]],
      fechaIngreso: [new Date().toISOString(), [Validators.required]],
      disponibilidad: [true],
      descripcion: [''],
      confirmacion: [false, [Validators.requiredTrue]]
    });
  }

  async onSubmit() {
    if (this.articuloForm.valid) {
      await this.storageSvc.addArticulo(this.articuloForm.value);
      this.guardadoOK = true;
      setTimeout(() => {
        this.guardadoOK = false;
        this.router.navigate(['/listado-articulos']);
      }, 2000);
    }
  }
}