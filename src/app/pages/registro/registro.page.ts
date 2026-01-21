import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ArticulosService } from '../../services/articulos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss']
})

export class RegistroPage implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articulosService: ArticulosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      fecha: ['', Validators.required],
      confirmar: [false, Validators.requiredTrue]
    });
  }

  async guardar() {
    if (this.form.invalid) return;

    await this.articulosService.guardarArticulo(this.form.value);
    this.router.navigateByUrl('/listado');
  }

  verListado() {
  this.router.navigateByUrl('/listado');
}

}


