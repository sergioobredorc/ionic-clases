import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
<<<<<<< HEAD

=======
import { provideHttpClient } from '@angular/common/http';
>>>>>>> 70de455 (Actividad 3)
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      IonicModule.forRoot(),
      IonicStorageModule.forRoot()
<<<<<<< HEAD
    )
=======
    ),

    provideHttpClient(),

>>>>>>> 70de455 (Actividad 3)
  ],
});
