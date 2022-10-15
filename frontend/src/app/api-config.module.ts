import { InjectionToken, isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: API_BASE_URL,
      useFactory: () =>
        isDevMode() ? 'http://localhost:8080/api' : 'https://example.com/api',
    },
  ],
})
export class ApiConfigModule {}
