import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RickMortyGqlService } from '../../services/rickmorty-gql.service';
import { EpisodeModalComponent } from '../episode-modal/episode-modal.component';

@Component({
  selector: 'app-episodes',
  standalone: true,
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class EpisodesPage implements OnInit {

  episodes: any[] = [];
  loading = true;

  constructor(
    private service: RickMortyGqlService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
  this.service.getEpisodes().subscribe({
    next: res => {
      this.episodes = res.data.episodes.results;
      this.loading = false;
    },
    error: err => {
      console.error('Error GraphQL:', err);
      this.loading = false;
    }
  });
 }

  async openEpisode(id: string) {
    const modal = await this.modalCtrl.create({
      component: EpisodeModalComponent,
      componentProps: { episodeId: id }
    });
    await modal.present();
  }
}
