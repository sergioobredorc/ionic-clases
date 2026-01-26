import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';

import { PhotoService, Photo } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class GalleryPage implements OnInit {
  photos: Photo[] = [];
  loading = true; 
  errorMsg = '';
  constructor(private photoService: PhotoService) { }

  ngOnInit(){
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos = data
        this.loading = false;
      },
      error: (err) => {
        console.error("No se pudieron cargar las imagenes", err)
        this.loading = false;
      }
    })
  }


  trackById(_: number, item: Photo){
    return item.id;
  }
}
