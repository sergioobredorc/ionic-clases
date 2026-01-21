import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticulosService } from '../../services/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class RegisterPage {
  myForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(1)]],
    categoria: ['', Validators.required],
    fecha: ['', Validators.required],
    confirmacion: [false, Validators.requiredTrue],
  });

  constructor(
    private fb: FormBuilder,
    private articulosService: ArticulosService,
    private router: Router
  ) {}

  async guardar() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const articulo = {
      nombre: this.myForm.value.nombre!,
      precio: this.myForm.value.precio!,
      categoria: this.myForm.value.categoria!,
      fecha: this.myForm.value.fecha!,
    };

    await this.articulosService.addArticulo(articulo);

    alert('Artículo guardado correctamente');

    this.myForm.reset({
      confirmacion: false,
    });
  }

  showProductsPage() {
    console.log("clicked")
    return this.router.navigate(['/list']);
  }
}
