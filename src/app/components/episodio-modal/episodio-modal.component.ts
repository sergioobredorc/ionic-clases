import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RickMortyService } from '../../services/rickmorty.service';

@Component({
  selector: 'app-episodio-modal',
  standalone: true,
  templateUrl: './episodio-modal.component.html',
  styleUrls: ['./episodio-modal.component.scss'],
  imports: [IonicModule, CommonModule]
})
export class EpisodioModalComponent implements OnInit {

  @Input() episodeId!: string;

  episode: any;
  loading = true;

  constructor(
    private modalCtrl: ModalController,
    private rmSvc: RickMortyService
  ) {}

  ngOnInit() {
    this.rmSvc.getEpisodeDetail(this.episodeId).subscribe({
      next: (data) => {
        this.episode = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
