import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RickMortyGqlService } from '../../services/rickmorty-gql.service';

@Component({
  selector: 'app-episode-modal',
  standalone: true,                 
  templateUrl: './episode-modal.component.html',
  styleUrls: ['./episode-modal.component.scss'],
  imports: [
    IonicModule,                     
    CommonModule
  ]
})
export class EpisodeModalComponent implements OnInit {

  @Input() episodeId!: string;
  episode: any;
  loading = true;

  constructor(
    private modalCtrl: ModalController,
    private service: RickMortyGqlService
  ) {}

  ngOnInit() {
    this.service.getEpisodeDetail(this.episodeId).subscribe(res => {
      this.episode = res.data.episode;
      this.loading = false;
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
