import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/ticket';
import { map, Observable } from 'rxjs';

const OFFER_API = 'http://localhost:8080/ticket/';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  public getOffer() {
    return this.http.get<Ticket[]>(OFFER_API + 'offer');
  }

  public getTicket(id: number): Observable<Ticket> {
    return this.http
      .get<Ticket[]>(OFFER_API + `offer?id=${id}`)
      .pipe(map((array) => array[0]));
  }
}
