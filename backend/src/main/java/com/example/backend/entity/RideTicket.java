package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RideTicket extends Ticket {
    private Long vehicleNumber;
    @Transient
    private TicketType ticketType = TicketType.RIDE_TICKET;

    @Override
    @Transient
    public TicketState getTicketState() {
        return vehicleNumber == null ? TicketState.UNUSED: TicketState.IN_USE;
    }

    @Override
    public void activateTicket(Long vehicleNumber) {
       if(this.vehicleNumber == null) this.vehicleNumber = vehicleNumber;
    }

    @Override
    public boolean checkValidity(Long vehicleNumber) {
        if(vehicleNumber == null) return false;
        return vehicleNumber.equals(this.vehicleNumber);
    }
}
