import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ArticulosService } from '../../services/articulos';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss']
})
export class ListadoPage implements OnInit {

  articulos: any[] = [];

  constructor(
  private articulosService: ArticulosService,
  private router: Router
) {}

nuevoRegistro() {
  this.router.navigateByUrl('/registro');
}

  async ngOnInit() {
    this.articulos = await this.articulosService.obtenerArticulos();
  }
}
