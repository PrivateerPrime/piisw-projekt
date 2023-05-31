import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageComponent } from './feature/mainpage/mainpage.component';
import { LoginComponent } from './core/login/login.component';
import { LoginGuard } from './core/guards/login.guard';
import { RegisterComponent } from './core/register/register.component';
import { TicketComponent } from './feature/ticket/ticket.component';
import { NotFoundComponent } from './feature/not-found/not-found.component';
import { BuyTicketComponent } from './feature/buy-ticket/buy-ticket.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MyTicketsComponent } from './feature/my-tickets/my-tickets.component';
import { ValidateTicketComponent } from './feature/validate-ticket/validate-ticket.component';
import { CheckedTicketComponent } from './feature/checked-ticket/checked-ticket.component';
import { CheckTicketComponent } from './feature/check-ticket/check-ticket.component';

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
    path: 'buy-ticket/:id',
    component: BuyTicketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ticket/:id',
    component: TicketComponent,
  },
  {
    path: 'my-tickets',
    component: MyTicketsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'validate-tickets/:id',
    component: ValidateTicketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'check-ticket',
    component: CheckTicketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'checked-ticket',
    component: CheckedTicketComponent,
    canActivate: [AuthGuard],
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
