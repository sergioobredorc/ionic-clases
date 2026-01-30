import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { RickMortyGqlService } from 'src/app/services/rickmorty-gql.service';

/* =======================
   TIPOS
======================= */
type EpisodeList = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
}

type EpisodeQueryData = {
  episodes: {
    results: EpisodeList[];
  }
}

type EpisodesCharacter = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

type EpisodeDetail = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: EpisodesCharacter[];
}

type EpisodeDetailQueryData = {
  episode: EpisodeDetail | null;
}


/* =======================
   QUERIES
======================= */
const GET_EPISODES = `
  query GetEpisodes {
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

const GET_EPISODE_DETAIL = `
  query GetEpisodeDetail($id: ID!) {
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
  selector: 'app-rm-graphql-episodes',
  templateUrl: './rm-graphql-episodes.page.html',
  styleUrls: ['./rm-graphql-episodes.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonicModule, RouterModule ],
})
export class RmGraphqlEpisodesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  loadingList = true;
  loadingDetail = false;
  errorMsg = '';

  episodes: EpisodeList[] = []
  selectedEpisode: EpisodeDetail | null = null;

  isModalOpen = false;
  
  constructor(private gql: RickMortyGqlService, private router: Router) {}

  ngOnInit(): void {
    this.gql
      .query<EpisodeQueryData>(GET_EPISODES)
      .pipe(finalize(() => (this.loadingList = false)))
      .subscribe({
        next: (res) => {
          this.episodes = res.data?.episodes?.results ?? [];
        },
        error: () =>
          (this.errorMsg = 'Error cargando la lista de episodios'),
      });
  }

  openEpisodeDetail(id: string) {
    this.isModalOpen = true;
    this.selectedEpisode = null;
    this.loadingDetail = true;

    this.gql
      .query<EpisodeDetailQueryData>(GET_EPISODE_DETAIL, { id })
      .pipe(finalize(() => (this.loadingDetail = false)))
      .subscribe({
        next: (res) => {
          this.selectedEpisode = res.data?.episode ?? null;
        },
        error: () =>
          (this.errorMsg = 'Error cargando el detalle del episodio'),
      });
    }

    closeModal() {
      this.isModalOpen = false;
      this.selectedEpisode = null;
    }

    trackById(_: number, item: { id: string }) {
      return item.id;
    }
  }