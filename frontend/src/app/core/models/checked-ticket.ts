import {BoughtTicket} from "./bought-ticket";

export interface CheckedTicket {
  isValid: boolean,
  ticket?: BoughtTicket
}
