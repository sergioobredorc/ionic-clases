import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyGqlService } from '../../service/rm-gql.service';

/* =======================
   TIPOS
======================= */
type EpisodeCard = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

type EpisodesQueryData = {
  episodes: { results: EpisodeCard[] };
};

type EpisodeCharacter = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
};

type EpisodeDetail = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: EpisodeCharacter[];
};

type EpisodeDetailQueryData = {
  episode: EpisodeDetail | null;
};

/* =======================
   QUERIES
======================= */
const GET_EPISODES = `
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
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
  selector: 'app-rm-graphql',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './rm-graphql.page.html',
  styleUrls: ['./rm-graphql.page.scss'],
})
export class RmGraphqlPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  loadingList = true;
  loadingDetail = false;
  errorMsg = '';

  episodes: EpisodeCard[] = [];
  selectedEpisode: EpisodeDetail | null = null;

  isModalOpen = false;

  constructor(private gql: RickMortyGqlService) {}

  ngOnInit(): void {
    this.gql
      .query<EpisodesQueryData>(GET_EPISODES, { page: 1 })
      .pipe(finalize(() => (this.loadingList = false)))
      .subscribe({
        next: (res) => {
          this.episodes = res.data?.episodes?.results ?? [];
        },
        error: () => (this.errorMsg = 'Error cargando episodios'),
      });
  }

  openEpisode(id: string) {
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
        error: () => (this.errorMsg = 'Error cargando detalle'),
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEpisode = null;
    this.loadingDetail = false;
  }

  trackById(_: number, e: EpisodeCard) {
    return e.id;
  }
}
