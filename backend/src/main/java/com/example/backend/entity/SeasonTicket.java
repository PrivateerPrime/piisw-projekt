package com.example.backend.entity;

import jakarta.persistence.Column;
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
public class SeasonTicket extends Ticket{
    @Column(nullable = false)
    private LocalDateTime expirationDate;

    @Transient
    private TicketType ticketType = TicketType.SEASON_TICKET;
    @Override
    @Transient
    public TicketState getTicketState() {
        return LocalDateTime.now().isBefore(expirationDate)? TicketState.IN_USE: TicketState.USED;
    }

    @Override
    public void activateTicket(Long vehicleNumber) {
    }

    @Override
    public boolean checkValidity(Long vehicleNumber) {
        return LocalDateTime.now().isBefore(expirationDate);
    }
}
