import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RickMortyService } from '../../services/rickmorty.service';
import { EpisodioModalComponent } from '../../components/episodio-modal/episodio-modal.component';

@Component({
  selector: 'app-episodios',
  standalone: true,
  templateUrl: './episodios.page.html',
  styleUrls: ['./episodios.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class EpisodiosPage implements OnInit {

  episodes: any[] = [];
  loading = true;

  constructor(
    private rmSvc: RickMortyService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.rmSvc.getEpisodes().subscribe({
      next: (data) => {
        this.episodes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  async abrirDetalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: EpisodioModalComponent,
      componentProps: {
        episodeId: id
      }
    });

    await modal.present();
  }
}
