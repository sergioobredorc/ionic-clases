import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyService, Response } from '../../services/rick-morty';
import { RouterLink } from '@angular/router';

type CharacterCard = {
  id: string;
  name: string;
  status: string;
  image: string;
};

type CharactersQueryData = {
  characters: { results: CharacterCard[] };
};

type CharacterDetail = {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { id: string; name: string };
  episode: { id: string; name: string; episode: string }[];
};

type CharacterDetailQueryData = {
  character: CharacterDetail | null;
};

type LocationResident = {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
};

type LocationWithResidents = {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: LocationResident[];
};

type LocationResidentsQueryData = {
  location: LocationWithResidents | null;
};

const GET_CHARACTERS_SIMPLE = `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        image
      }
    }
  }
`;

const GET_CHARACTER_COMPLEX = `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      origin { name }
      location { id name }
      episode {
        id
        name
        episode
      }
    }
  }
`;

const GET_LOCATION_RESIDENTS = `
  query GetLocationResidents($locationId: ID!) {
    location(id: $locationId) {
      id
      name
      type
      dimension
      residents {
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
  selector: 'app-rick-morty-graphql',
  standalone: true,
  imports: [ CommonModule,IonicModule,RouterLink ],
  templateUrl: './rick-morty-graphql.component.html',
  styleUrls: ['./rick-morty-graphql.component.scss'],
})
export class RickMortyGraphqlComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  loadingList = true;
  loadingDetail = false;
  loadingResidents = false;

  errorMsg = '';

  characters: CharacterCard[] = [];
  selected: CharacterDetail | null = null;
  locationInfo: LocationWithResidents | null = null;

  isModalOpen = false;

  constructor(private gql: RickMortyService) { }

  ngOnInit(): void {
    this.gql
      .query<CharactersQueryData>(GET_CHARACTERS_SIMPLE, { page: 1 })
      .pipe(finalize(() => (this.loadingList = false)))
      .subscribe({
        next: (res: Response<CharactersQueryData>) => {
          this.characters = res.data?.characters?.results ?? [];
        },
        error: () => (this.errorMsg = 'Error cargando personajes'),
      });
  }

  openDetail(id: string) {
    this.isModalOpen = true;
    this.selected = null;
    this.locationInfo = null;
    this.loadingDetail = true;

    this.gql
      .query<CharacterDetailQueryData>(GET_CHARACTER_COMPLEX, { id })
      .pipe(finalize(() => (this.loadingDetail = false)))
      .subscribe({
        next: (res) => {
          this.selected = res.data?.character ?? null;
        },
        error: () => (this.errorMsg = 'Error cargando detalles'),
      });
  }

  loadResidents() {
    const locationId = this.selected?.location?.id;
    if (!locationId) return;

    this.loadingResidents = true;
    this.locationInfo = null;

    this.gql
      .query<LocationResidentsQueryData>(GET_LOCATION_RESIDENTS, { locationId })
      .pipe(finalize(() => (this.loadingResidents = false)))
      .subscribe({
        next: (res) => {
          this.locationInfo = res.data?.location ?? null;
        },
        error: () => (this.errorMsg = 'Error cargando residentes'),
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selected = null;
    this.locationInfo = null;
    this.loadingDetail = false;
    this.loadingResidents = false;
  }

  trackById(_: number, c: CharacterCard) {
    return c.id;
  }
}