import {Component, OnInit} from '@angular/core';
import {CheckedTicket} from "../../core/models/checked-ticket";

@Component({
  selector: 'app-checked-ticket',
  templateUrl: './checked-ticket.component.html',
  styleUrls: ['./checked-ticket.component.scss']
})
export class CheckedTicketComponent implements OnInit {

  ticket?: CheckedTicket

  ngOnInit(): void {
    this.ticket = history.state
  }

  mapTicketType = {
    'RIDE_TICKET': 'Bilet na przejazd',
    'SEASON_TICKET': 'Bilet czasowy',
    'TIME_TICKET': 'Bilet sezonowy'
  }

  mapTicketState = {
    'USED': 'Wykożystany',
    'UNUSED': 'Nie użyty',
    'IN_USE': 'W użyciu'
  }

}
