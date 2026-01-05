import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()   // <- THIS MUST BE HERE
  ]
});