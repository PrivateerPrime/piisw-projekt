import {Component, OnInit} from '@angular/core';
import {CheckedTicket} from "../../core/models/checked-ticket";
import {ticketType} from "../../core/models/ticket";

@Component({
  selector: 'app-checked-ticket',
  templateUrl: './checked-ticket.component.html',
  styleUrls: ['./checked-ticket.component.scss']
})
export class CheckedTicketComponent implements OnInit{

  ticket?: CheckedTicket
  ngOnInit(): void {
    this.ticket = history.state
  }

  mapTicketType(ticketType?: ticketType): string{
    if(!ticketType) return ''

    let translate = {
      'RIDE_TICKET': 'Bilet na przejazd',
      'SEASON_TICKET': 'Bilet czasowy',
      'TIME_TICKET': 'Bilet sezonowy'
    }

    return translate[ticketType]
  }

}
