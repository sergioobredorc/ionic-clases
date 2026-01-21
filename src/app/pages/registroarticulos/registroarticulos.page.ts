import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ArticulosService } from '../../services/articulos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registroarticulos',
  standalone: true,
  templateUrl: './registroarticulos.page.html',
  styleUrls: ['./registroarticulos.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule, RouterLink
  ],
})
export class RegistroarticulosPage implements OnInit {

  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articulosService: ArticulosService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [null, [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      fecha: ['', Validators.required],
      disponible: [true],
      descripcion: ['']
    });
  }

  // 👉 getter usado en el HTML (f['nombre'], etc)
  get f() {
    return this.formulario.controls;
  }

  async guardarArticulo() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    await this.articulosService.guardarArticulo(this.formulario.value);

    const alert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'Artículo guardado correctamente',
      buttons: ['OK']
    });

    await alert.present();
    this.formulario.reset({ disponible: true });
  }

  volverInicio() {
    this.router.navigate(['/home']);
  }
}
