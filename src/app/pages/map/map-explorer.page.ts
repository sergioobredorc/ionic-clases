import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import * as L from 'leaflet';

type Poi = {
  id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
};

@Component({
  selector: 'app-map-explorer',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './map-explorer.page.html',
  styleUrls: ['./map-explorer.page.scss'],
})
export class MapExplorerPage implements AfterViewInit, OnDestroy {
  @ViewChild(IonModal) modal!: IonModal;

  private map?: L.Map;
  private userMarker?: L.Marker;
  private poiMarkers: L.Marker[] = [];

  loadingLocation = false;
  errorMsg = '';
  userCoords: { lat: number; lng: number } | null = null;
  isModalOpen = false;
  selectedPoi: Poi | null = null;
  distanceToSelectedMeters: number | null = null;

  pois: Poi[] = [
    {
      id: 'p1',
      name: 'Portal Alfa',
      description: 'Punto de interés simulado para practicar interacción con mapas.',
      lat: 4.7110,
      lng: -74.0721,
    },
    {
      id: 'p2',
      name: 'Portal Beta',
      description: 'Otro punto para probar selección y modal.',
      lat: 4.6680,
      lng: -74.0560,
    },
    {
      id: 'p3',
      name: 'Portal Gamma',
      description: 'Punto extra para practicar distancias.',
      lat: 4.7400,
      lng: -74.0900,
    },
  ];

  async ngAfterViewInit(): Promise<void> {
    this.fixLeafletIcons();
    this.initMap({ lat: 4.7110, lng: -74.0721 }, 12);
    this.renderPois();
    await this.locateUser();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private fixLeafletIcons() {
    const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
    const iconUrl = 'assets/leaflet/marker-icon.png';
    const shadowUrl = 'assets/leaflet/marker-shadow.png';
    
    L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  private initMap(center: { lat: number; lng: number }, zoom: number) {
    this.map = L.map('map', {
      center: [center.lat, center.lng],
      zoom,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 500);
  }

  private renderPois() {
    if (!this.map) return;

    this.poiMarkers.forEach((m) => m.remove());
    this.poiMarkers = [];

    for (const poi of this.pois) {
      const marker = L.marker([poi.lat, poi.lng])
        .addTo(this.map)
        .on('click', () => this.openPoiModal(poi));

      marker.bindTooltip(poi.name, { direction: 'top', offset: [0, -10] });
      this.poiMarkers.push(marker);
    }
  }

  async locateUser(): Promise<void> {
    this.errorMsg = '';
    this.loadingLocation = true;

    try {
      const coords = await this.getBrowserLocation();
      this.userCoords = coords;
      this.setUserMarker(coords);
      this.map?.setView([coords.lat, coords.lng], 14);
      
      setTimeout(() => {
        this.map?.invalidateSize();
      }, 200);

    } catch (e: any) {
      this.errorMsg = e?.message || 'Error al obtener ubicación.';
    } finally {
      this.loadingLocation = false;
    }
  }

  private getBrowserLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocalización no soportada.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          reject(new Error(this.formatGeoError(err)));
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    });
  }

  private formatGeoError(err: GeolocationPositionError): string {
    switch (err.code) {
      case err.PERMISSION_DENIED: return 'Permiso denegado.';
      case err.POSITION_UNAVAILABLE: return 'Ubicación no disponible.';
      case err.TIMEOUT: return 'Tiempo agotado.';
      default: return 'Error desconocido.';
    }
  }

  private setUserMarker(coords: { lat: number; lng: number }) {
    if (!this.map) return;

    if (this.userMarker) {
      this.userMarker.setLatLng([coords.lat, coords.lng]);
    } else {
      this.userMarker = L.marker([coords.lat, coords.lng]).addTo(this.map);
      this.userMarker.bindPopup('Tu ubicación').openPopup();
    }
  }

  openPoiModal(poi: Poi) {
    this.selectedPoi = poi;
    this.isModalOpen = true;
    this.distanceToSelectedMeters = null;
    
    if (this.userCoords) {
      this.distanceToSelectedMeters = this.haversineMeters(
        this.userCoords.lat, this.userCoords.lng,
        poi.lat, poi.lng
      );
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedPoi = null;
    this.distanceToSelectedMeters = null;
  }

  private haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371000;
    const toRad = (v: number) => (v * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }
}