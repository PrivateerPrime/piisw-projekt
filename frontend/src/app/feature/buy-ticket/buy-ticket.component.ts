import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../core/models/ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.scss'],
})
export class BuyTicketComponent implements OnInit {
  ticket: Ticket | undefined;

  private id: number | undefined;

  successfulPurchase: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.ticketService.getTicket(this.id).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }

  confirmBuying() {
    this.ticketService.buyTicket(this.id!).subscribe(
      (value) => {
        this.successfulPurchase = value.status === 200;
      },
      () => {
        this.successfulPurchase = false;
      }
    );
  }

  rejectBuying() {
    this.router.navigate(['/']);
  }
}
