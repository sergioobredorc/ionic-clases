import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RickMortyService } from '../../services/rickmorty.service';

@Component({
  selector: 'app-rick-morty',
  templateUrl: './episode-modal.component.html',
  styleUrls: ['./episode-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class RickMortyPage implements OnInit {

  episodes: any[] = [];
  selectedEpisode: any = null;
  
  loadingList = false;
  loadingDetail = false;
  isModalOpen = false;

  constructor(private rmService: RickMortyService) { }

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.loadingList = true;
    const query = `
      query {
        episodes {
          results {
            id
            name
            episode
            air_date
          }
        }
      }
    `;

    this.rmService.query(query).subscribe({
      next: (res: any) => {
        if (res.data && res.data.episodes) {
          this.episodes = res.data.episodes.results;
        }
        this.loadingList = false;
      },
      error: (err: any) => {
        console.error('Error cargando episodios:', err);
        this.loadingList = false;
      }
    });
  }

  openDetail(id: string) {
    this.loadingDetail = true;
    this.isModalOpen = true; 
    
    const query = `
      query($id: ID!) {
        episode(id: $id) {
          id
          name
          episode
          air_date
          characters {
            id
            name
            image
            status
            species
          }
        }
      }
    `;

    this.rmService.query(query, { id }).subscribe({
      next: (res: any) => {
        if (res.data && res.data.episode) {
          this.selectedEpisode = res.data.episode;
        }
        this.loadingDetail = false;
      },
      error: (err: any) => {
        console.error('Error cargando detalle:', err);
        this.loadingDetail = false;
      }
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEpisode = null;
  }
}