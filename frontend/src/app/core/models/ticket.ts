export interface Ticket {
  id: number;
  price: number;
  validityPeriod: number | null;
  ticketType: ticketType;
  discounted: boolean;
}

export type ticketType = 'RIDE_TICKET' | 'SEASON_TICKET' | 'TIME_TICKET';
