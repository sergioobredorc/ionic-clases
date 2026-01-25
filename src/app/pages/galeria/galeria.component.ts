import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PhotosService, Photo } from '../../services/photos.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GaleriaComponent implements OnInit {
  photos: Photo[] = [];
  loading: boolean = true;

  constructor(private photoService: PhotosService) { }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
        console.log('Datos recibidos:', data);
      },
      error: (err) => {
        console.error('Fallo de conexión:', err);
        this.loading = false;
      }
    });
  }
}