import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../core/services/ticket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrls: ['./validate-ticket.component.scss'],
})
export class ValidateTicketComponent implements OnInit {
  private id: number | undefined;
  formGroup = new FormGroup({
    vehicleNumber: new FormControl('', Validators.required),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
  }

  useTicket() {
    let vehicleNumber: string = this.formGroup.value.vehicleNumber!;
    this.ticketService.useTicket(this.id!, vehicleNumber).subscribe({
      next: (value) => {
        this.router.navigate(['my-tickets']);
      },
      error: () => {
        window.alert('error');
      },
    });
  }
}
