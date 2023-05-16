import {Ticket} from "./ticket";

export interface CheckedTicket {
  isValid: boolean,
  ticket?: Ticket
}
