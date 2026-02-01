import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { RickMortyGqlService, RespuestaGraphQL } from '../../services/rickmorty-gql.service';

interface InfoEpisodio {
  id: string;
  name: string;
  air_date: string;
  episode: string;
};

interface DataConsultaEpisodios {
  episodes: { results: InfoEpisodio[] };
};

interface DetalleEpisodio {
  id: string;
  name: string;
  episode: string;
  air_date: string;
  characters: {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
  }[];
};

interface DataConsultaDetalle {
  episode: DetalleEpisodio | null;
};

const CONSULTA_LISTADO_EPISODIOS = `
  query ListarEpisodios($p: Int) {
    episodes(page: $p) {
      results {
        episode
        air_date
        name
        id
      }
    }
  }
`;

const CONSULTA_REPARTO_EPISODIO = `
  query ObtenerReparto($identificador: ID!) {
    episode(id: $identificador) {
      name
      air_date
      episode
      characters {
        image
        name
        species
        status
        id
      }
      id
    }
  }
`;

@Component({
  selector: 'app-episodios',
  standalone: true,
  templateUrl: './episodios.page.html',
  styleUrls: ['./episodios.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class EpisodiosPage implements OnInit {
  @ViewChild(IonModal) ventanaModal!: IonModal;

  estaCargandoLista = true;
  estaCargandoInfo = false;
  mensajeError = '';

  listaDeEpisodios: InfoEpisodio[] = [];
  episodioElegido: DetalleEpisodio | null = null;
  mostrarModal = false;

  constructor(private servicioGql: RickMortyGqlService) { }

  ngOnInit(): void {
    this.cargarEpisodiosIniciales();
  }

  cargarEpisodiosIniciales() {
    this.servicioGql
      .ejecutarConsulta<DataConsultaEpisodios>(CONSULTA_LISTADO_EPISODIOS, { p: 1 })
      .pipe(finalize(() => (this.estaCargandoLista = false)))
      .subscribe({
        next: (respuesta: RespuestaGraphQL<DataConsultaEpisodios>) => {
          this.listaDeEpisodios = respuesta.data?.episodes?.results ?? [];
        },
        error: () => (this.mensajeError = 'No se pudieron traer los episodios'),
      });
  }

  verDetalles(idEpisodio: string) {
    this.mostrarModal = true;
    this.episodioElegido = null;
    this.estaCargandoInfo = true;

    this.servicioGql
      .ejecutarConsulta<DataConsultaDetalle>(CONSULTA_REPARTO_EPISODIO, { identificador: idEpisodio })
      .pipe(finalize(() => (this.estaCargandoInfo = false)))
      .subscribe({
        next: (res) => {
          this.episodioElegido = res.data?.episode ?? null;
        },
        error: () => (this.mensajeError = 'Error al obtener datos del reparto'),
      });
  }

  cerrarVentana() {
    this.mostrarModal = false;
    this.episodioElegido = null;
  }
}