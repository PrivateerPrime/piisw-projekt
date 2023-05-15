import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainpageComponent } from './feature/mainpage/mainpage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { TicketComponent } from './feature/ticket/ticket.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { NgOptimizedImage } from '@angular/common';
import { SpinnerComponent } from './feature/spinner/spinner.component';
import { BuyTicketComponent } from './feature/buy-ticket/buy-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MainpageComponent,
    TicketComponent,
    NotFoundComponent,
    SpinnerComponent,
    BuyTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
