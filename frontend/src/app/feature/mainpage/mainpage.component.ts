import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../core/services/ticket.service';
import { Ticket } from '../../core/models/ticket';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  tickets: Ticket[] | undefined;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getOffer().subscribe((resp) => (this.tickets = resp));
  }
}
