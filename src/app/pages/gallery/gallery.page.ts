import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { PhotosService, Photo } from '../../services/photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GalleryPage implements OnInit {

  photos: Photo[] = [];
  loading = true;
  errorMsg = "";


  constructor(private photosService: PhotosService) { }

  ngOnInit() {
    this.photosService.getPhotos().subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al consumir la api", err);
        this.errorMsg = "No se pudieron cargar las imagenes";
        this.loading = false;
      }
    });
  }

  trackById(_: number, item: Photo): string {
    return item.id;
  }

}
