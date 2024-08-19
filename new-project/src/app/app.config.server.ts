import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LocalCartService } from './services/local-cart.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
    
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
