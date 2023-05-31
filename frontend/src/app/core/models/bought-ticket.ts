import { Ticket } from './ticket';

export interface BoughtTicket extends Ticket {
  isDiscounted: boolean;
  purchaseDate: Date;
  vehicleNumber: number | null;
  ticketState: ticketState;
}

export type ticketState = 'UNUSED' | 'IN_USE' | 'USED';
