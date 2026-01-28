import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyGqlService } from '../../services/rickmorty-gql.service';

const GET_EPISODES = `
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

const GET_EPISODE_DETAIL = `
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      name
      episode
      air_date
      characters {
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
  encapsulation: ViewEncapsulation.None
})
export class RmGraphqlPage implements OnInit {
  episodes: any[] = [];
  selectedEpisode: any = null;
  loadingList = true;
  loadingDetail = false;
  isModalOpen = false;

  constructor(private gql: RickMortyGqlService) {}

  ngOnInit() {
    this.gql.query<any>(GET_EPISODES)
      .pipe(finalize(() => this.loadingList = false))
      .subscribe(res => {
        this.episodes = res.data?.episodes?.results ?? [];
      });
  }

  openDetail(id: string) {
    this.isModalOpen = true;
    this.loadingDetail = true;
    this.selectedEpisode = null;

    this.gql.query<any>(GET_EPISODE_DETAIL, { id })
      .pipe(finalize(() => this.loadingDetail = false))
      .subscribe(res => {
        this.selectedEpisode = res.data?.episode;
      });
  }

  closeModal() {
    this.isModalOpen = false;
  }
}