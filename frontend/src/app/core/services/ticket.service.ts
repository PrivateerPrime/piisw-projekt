import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { map, Observable } from 'rxjs';
import { BoughtTicket } from '../models/bought-ticket';

const TICKET_API = 'http://localhost:8080/ticket/';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public getOffer() {
    return this.http.get<Ticket[]>(TICKET_API + 'offer');
  }

  public getTicket(id: number): Observable<Ticket> {
    return this.http
      .get<Ticket[]>(TICKET_API + `offer?id=${id}`)
      .pipe(map((array) => array[0]));
  }

  public buyTicket(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(TICKET_API + `buy?id=${id}`, {
      observe: 'response',
    });
  }

  public getTicketByUser() {
    return this.http.get<BoughtTicket[]>(TICKET_API + 'user');
  }
}
