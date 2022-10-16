import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ApiConfigModule } from './api-config.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrderFormComponent } from './order-form/order-form.component';
import { CreateOrderDialogComponent } from './create-order-dialog/create-order-dialog.component';
import { JsonKeysToCamelCaseInterceptor } from './json-keys-to-camel-case.interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { OrderListComponent } from './order-list/order-list.component';
import { MatSelectModule } from '@angular/material/select';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TransportPageComponent } from './pages/transport-page/transport-page.component';
import { MatNativeDateModule } from '@angular/material/core';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    LoginPageComponent,
    MainPageComponent,
    OrderFormComponent,
    CreateOrderDialogComponent,
    OrderListComponent,
    TransportPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiConfigModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
    MatSelectModule,
    AngularYandexMapsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonKeysToCamelCaseInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru-RU' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
