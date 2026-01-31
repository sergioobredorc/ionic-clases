import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RickMortyService } from '../../services/rick-morty.service';
import { EpisodeDetailModal } from '../modals/episode-detail/episode-detail.modal';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EpisodesPage implements OnInit {

  episodes: any[] = [];
  loading = true;

  constructor(
    private rmService: RickMortyService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.rmService.getEpisodes().subscribe(res => {
      this.episodes = res.data.episodes.results;
      this.loading = false;
    });
  }

  async openEpisode(id: string) {
    const modal = await this.modalCtrl.create({
      component: EpisodeDetailModal,
      componentProps: { episodeId: id }
    });
    await modal.present();
  }
}
