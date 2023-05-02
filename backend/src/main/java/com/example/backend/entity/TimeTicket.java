package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Transient;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeTicket extends Ticket{

    private LocalDateTime expirationDate;
    private Long validityPeriod;

    @Transient
    private TicketType ticketType = TicketType.TIME_TICKET;
    @Override
    @Transient
    public TicketState getTicketState() {
        if (expirationDate == null) return TicketState.UNUSED;
        return LocalDateTime.now().isBefore(expirationDate)? TicketState.IN_USE: TicketState.USED;
    }

    @Override
    public void activateTicket(Long vehicleNumber) {
        if(expirationDate == null) expirationDate = LocalDateTime.now().plusMinutes(validityPeriod);
    }

    @Override
    public boolean checkValidity(Long vehicleNumber) {
        if (expirationDate == null) return false;
        return LocalDateTime.now().isBefore(expirationDate);
    }

}
