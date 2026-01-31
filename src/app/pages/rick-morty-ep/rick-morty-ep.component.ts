import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyService } from '../../services/rick-morty';
import { RouterLink } from '@angular/router';

type EpisodiosList = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

type EpisodiosQueryData = {
  episodes: {
    results: EpisodiosList[];
  };
};

type EpisodiosPersonajes = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
};

type EpisodiosDetallado = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: EpisodiosPersonajes[];
};

type EpisodiosDetalladoQueryData = {
  episode: EpisodiosDetallado | null;
};

const GET_EPISODIOS = `
  query GetEpisodios {
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

const GET_EPISODIOS_DETALLADO = `
  query GetEpisodiosDetallado($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`;

@Component({
  selector: 'app-rick-morty-ep',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './rick-morty-ep.component.html',
  styleUrls: ['./rick-morty-ep.component.scss'],
})
export class RickMortyEpComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  loadingList = true;
  loadingEpisode = false;
  errorMsg = '';

  episodios: EpisodiosList[] = [];
  selectedEpisode: EpisodiosDetallado | null = null;

  isEpisodeModalOpen = false;

  constructor(private gql: RickMortyService) { }

  ngOnInit(): void {
    this.gql
      .query<EpisodiosQueryData>(GET_EPISODIOS)
      .pipe(finalize(() => (this.loadingList = false)))
      .subscribe({
        next: (res) => {
          this.episodios = res.data?.episodes?.results ?? [];
        },
        error: () => {
          this.errorMsg = 'Error cargando el listado de episodios';
        },
      });
  }

  trackById(_: number, item: { id: string }) {
    return item.id;
  }


  openEpisodeDetail(id: string) {
    this.isEpisodeModalOpen = true;
    this.loadingEpisode = true;
    this.selectedEpisode = null;

    this.gql
      .query<EpisodiosDetalladoQueryData>(
        GET_EPISODIOS_DETALLADO,
        { id }
      )
      .pipe(finalize(() => (this.loadingEpisode = false)))
      .subscribe({
        next: (res) => {
          this.selectedEpisode = res.data?.episode ?? null;
        },
        error: () => {
          this.errorMsg = 'Error cargando el episodio';
          this.closeEpisodeModal();
        },
      });
  }

  closeEpisodeModal() {
    this.isEpisodeModalOpen = false;
    this.selectedEpisode = null;
  }
}