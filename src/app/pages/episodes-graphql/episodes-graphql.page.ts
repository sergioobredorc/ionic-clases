import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RickMortyGqlService, GqlResponse } from '../../services/rickmorty-gql.service';

type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

type EpisodesQueryData = {
  episodes: {
    results: Episode[];
  };
};

type Character = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
};

type EpisodeDetail = {
  name: string;
  episode: string;
  air_date: string;
  characters: Character[];
};

type EpisodeDetailQueryData = {
  episode: EpisodeDetail | null;
};

const GET_EPISODES = `
query {
  episodes(page: 1) {
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
query GetEpisode($id: ID!) {
  episode(id: $id) {
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
  selector: 'app-episodes-graphql',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './episodes-graphql.page.html',
  styleUrls: ['./episodes-graphql.page.scss'],
})
export class EpisodesGraphqlPage implements OnInit {

  episodes: Episode[] = [];
  selectedEpisode: EpisodeDetail | null = null;

  loadingList = true;
  loadingDetail = false;

  isModalOpen = false;

  constructor(private gql: RickMortyGqlService) {}

  ngOnInit(): void {
    this.gql.query<EpisodesQueryData>(GET_EPISODES)
      .subscribe({
        next: (res: GqlResponse<EpisodesQueryData>) => {
          this.episodes = res.data?.episodes.results ?? [];
          this.loadingList = false;
        },
        error: () => {
          this.loadingList = false;
        }
      });
  }

  openEpisode(id: string) {
    this.isModalOpen = true;
    this.loadingDetail = true;
    this.selectedEpisode = null;

    this.gql.query<EpisodeDetailQueryData>(GET_EPISODE_DETAIL, { id })
      .subscribe({
        next: (res) => {
          this.selectedEpisode = res.data?.episode ?? null;
          this.loadingDetail = false;
        },
        error: () => {
          this.loadingDetail = false;
        }
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEpisode = null;
  }
}
