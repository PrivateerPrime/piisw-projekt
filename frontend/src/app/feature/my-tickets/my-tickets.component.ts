import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { BoughtTicket } from '../../core/models/bought-ticket';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss'],
})
export class MyTicketsComponent implements OnInit {
  tickets: BoughtTicket[] | undefined;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTicketByUser().subscribe((tickets) => {
      console.log(tickets);
      tickets.forEach(
        (ticket) => (ticket.purchaseDate = new Date(ticket.purchaseDate))
      );
      this.tickets = tickets;
    });
  }
}
