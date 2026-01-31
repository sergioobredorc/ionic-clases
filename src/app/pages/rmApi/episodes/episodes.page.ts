import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { finalize } from 'rxjs/operators';

import {
  RickMortyEpisodesGqlService,
  GqlResponse
} from 'src/app/services/rick-and-morty.service';

/* =======================
   TIPOS
======================= */
type EpisodeCard = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
};

type EpisodesQueryData = {
  episodes: {
    info: {
      pages: number;
      next: number | null;
    };
    results: EpisodeCard[];
  };
};

type EpisodeDetail = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
  }[];
};


type EpisodeDetailQueryData = {
  episode: EpisodeDetail | null;
};


/* =======================
   QUERY
======================= */
const GET_EPISODES = `
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        pages
        next
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

const GET_EPISODE_DETAIL = `
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
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
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
})
export class RmGraphqlPage implements OnInit {
  loading = true;
  errorMsg = '';

  episodes: EpisodeCard[] = [];
  currentPage = 1;
  hasMore = true;

  isModalOpen = false;
  loadingDetail = false;
  selectedEpisode: EpisodeDetail | null = null;

  constructor(private episodesGql: RickMortyEpisodesGqlService) {}

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes() {
    if (!this.hasMore) return;

    this.episodesGql
      .query<EpisodesQueryData>(GET_EPISODES, { page: this.currentPage })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: GqlResponse<EpisodesQueryData>) => {
          const data = res.data?.episodes;
          if (!data) return;

          this.episodes.push(...data.results);
          this.hasMore = data.info.next !== null;
          this.currentPage++;
        },
        error: () => (this.errorMsg = 'Error cargando episodios'),
      });
  }

  openEpisode(id: string) {
    this.isModalOpen = true;
    this.loadingDetail = true;
    this.selectedEpisode = null;

    this.episodesGql
      .query<EpisodeDetailQueryData>(GET_EPISODE_DETAIL, { id })
      .pipe(finalize(() => (this.loadingDetail = false)))
      .subscribe({
        next: (res) => {
          this.selectedEpisode = res.data?.episode ?? null;
        },
        error: () => (this.errorMsg = 'Error cargando episodio'),
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