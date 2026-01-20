import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { addIcons } from 'ionicons';
import { informationCircleOutline } from 'ionicons/icons';
import { cashOutline } from 'ionicons/icons';

addIcons({
  'information-circle-outline': informationCircleOutline,
  'cash-outline': cashOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      IonicModule.forRoot(),
      IonicStorageModule.forRoot()
    )
  ],
});
