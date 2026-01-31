import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink} from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-registro-articulo',
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html'
})
export class RegistroArticuloComponent {

  fArt: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private db: StorageService, 
    private router: Router
  ) {
   
    this.fArt = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]], 
      precio: [null, [Validators.required, Validators.min(1)]],     
      categoria: ['', Validators.required],                         
      fechaIngreso: ['', Validators.required],                      
      disponibilidad: [true],
      descripcion: [''],
      confirmacion: [false, Validators.requiredTrue]                
    });
  }


  async guardar() {
    if (this.fArt.valid) {
      
      await this.db.grabar(this.fArt.value);
      
    
      this.router.navigate(['/listado-articulos']);

      console.log('Artículo guardado y navegando al listado...');
  } else {
    console.log('El formulario no es válido');
  }
}
}