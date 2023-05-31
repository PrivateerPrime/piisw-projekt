import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { map, Observable } from 'rxjs';
import { BoughtTicket } from '../models/bought-ticket';
import { CheckedTicket } from '../models/checked-ticket';

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

  public checkTicket(
    ticketId: string,
    vehicleNumber: string
  ): Observable<CheckedTicket> {
    const param = new HttpParams()
      .set('ticketId', ticketId)
      .set('vehicleNumber', vehicleNumber);
    return this.http.get<CheckedTicket>(TICKET_API + 'check', {
      params: param,
    });
  }

  public useTicket(ticketId: number, vehicleNumber: string): Observable<any> {
    return this.http.get(
      TICKET_API +
        `activate?ticketId=${ticketId}&vehicleNumber=${vehicleNumber}`
    );
  }
}
