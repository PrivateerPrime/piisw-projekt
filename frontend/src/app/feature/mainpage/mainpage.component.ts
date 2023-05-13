import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { Ticket } from '../../core/models/ticket';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  normalTickets: Ticket[] = [];
  discountedTickets: Ticket[] = [];
  tickets: Ticket[] = this.normalTickets;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getOffer().subscribe((resp) => {
      resp.forEach((value) => {
        value.discounted
          ? this.discountedTickets.push(value)
          : this.normalTickets.push(value);
      });
    });
  }

  changeTicketType() {
    if (this.tickets == this.normalTickets)
      this.tickets = this.discountedTickets;
    else this.tickets = this.normalTickets;
  }

  protected readonly tick = tick;
}
