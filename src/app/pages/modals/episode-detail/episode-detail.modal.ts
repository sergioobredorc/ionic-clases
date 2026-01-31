import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RickMortyService } from '../../../services/rick-morty.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.modal.html',
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EpisodeDetailModal implements OnInit {

  @Input() episodeId!: string;

  episode: any;
  loading = true;

  constructor(
    private rmService: RickMortyService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.rmService.getEpisodeDetail(this.episodeId).subscribe(res => {
      this.episode = res.data.episode;
      this.loading = false;
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
