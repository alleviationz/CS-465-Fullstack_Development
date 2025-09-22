import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// load in the bootStrap CSS for the application given the config
bootstrapApplication(App, appConfig)
  .catch((err: any) => console.error(err));
