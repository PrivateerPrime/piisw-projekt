package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@ToString

@NoArgsConstructor
@AllArgsConstructor
public class TicketOffer {
    @Id
    @GeneratedValue
    private Long id;
    private Double price;
    private Long validityPeriod;
    @Enumerated(EnumType.STRING)
    private TicketType ticketType;

    private boolean isDiscounted = false;

}
