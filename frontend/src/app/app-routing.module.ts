import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './feature/mainpage/mainpage.component';
import { LoginComponent } from './core/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { RegisterComponent } from './core/register/register.component';
import { TicketComponent } from './feature/ticket/ticket.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainpageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'ticket/:id',
    component: TicketComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
