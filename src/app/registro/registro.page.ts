import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class RegistroPage {

  categorias = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar'];

  articuloForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: ['', [Validators.required, Validators.min(1)]],
    categoria: ['', Validators.required],
    fecha: ['', Validators.required],
    activo: [true],
    descripcion: [''],
    confirmacion: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {}

  async guardarArticulo() {
    if (this.articuloForm.valid) {
      await this.storageService.addArticulo(this.articuloForm.value);
      this.articuloForm.reset();
      this.router.navigate(['/listado']);
    }
  }
}
