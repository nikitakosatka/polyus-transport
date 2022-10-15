import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: API_BASE_URL, useValue: 'https://example.com' }],
})
export class ApiConfigModule {}
