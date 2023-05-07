import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../core/models/ticket';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  ticket: Ticket | undefined;

  private id: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.ticketService.getTicket(this.id).subscribe((ticket) => {
      this.ticket = ticket;
      console.log(this.ticket);
    });
  }
}
