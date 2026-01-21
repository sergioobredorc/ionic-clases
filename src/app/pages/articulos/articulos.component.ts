import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss']
})
export class ArticulosComponent {

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: ['', [Validators.required, Validators.min(1)]],
    categoria: ['', Validators.required],
    fecha: ['', Validators.required],
    disponible: [false],
    confirmar: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private nav: NavController
  ) {}

  async guardar(){
    if(this.form.invalid) return;

    await this.storage.guardar(this.form.value);
    this.form.reset({disponible:false, confirmar:false});
    this.nav.navigateRoot('/ls-articulos');
  }

  irListado(){
    this.nav.navigateRoot('/ls-articulos');
  }
}
