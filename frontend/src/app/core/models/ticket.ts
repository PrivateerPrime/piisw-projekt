export interface Ticket {
  id: number;
  price: number;
  validityPeriod: number | null;
  ticketType: validityType;
  discounted: boolean;
}

export type validityType = 'RIDE_TICKET' | 'SEASON_TICKET' | 'TIME_TICKET';
