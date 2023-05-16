import {Component, inject} from '@angular/core';
import {TicketService} from "../../core/services/ticket.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-check-ticket',
  templateUrl: './check-ticket.component.html',
  styleUrls: ['./check-ticket.component.scss'],
})
export class CheckTicketComponent {

  ticketService = inject(TicketService)
  router = inject(Router)
  formGroup = new FormGroup({
    ticketId: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required)
  })

  checkTicket() {
    let ticketId= <string>this.formGroup.value.ticketId
    let vehicleNumber = <string>this.formGroup.value.vehicleNumber
    this.ticketService.checkTicket(ticketId, vehicleNumber).subscribe({
      next: value => this.router.navigate(['checked-ticket'], {state: value}),
      error: _ => this.router.navigate(['checked-ticket'], {state: {isValid: false}})
    })
  }
}
