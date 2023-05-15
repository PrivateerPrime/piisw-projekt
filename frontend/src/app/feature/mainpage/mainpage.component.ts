import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { Ticket } from '../../core/models/ticket';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  normalTickets: Ticket[] = [];
  discountedTickets: Ticket[] = [];
  tickets: Ticket[] = this.normalTickets;
  loading: boolean = true;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getOffer().subscribe((tickets) => {
      tickets.forEach((value: Ticket) => {
        value.discounted
          ? this.discountedTickets.push(value)
          : this.normalTickets.push(value);
      });
      this.loading = false;
    });
  }

  changeTicketType() {
    if (this.tickets == this.normalTickets)
      this.tickets = this.discountedTickets;
    else this.tickets = this.normalTickets;
  }
}
