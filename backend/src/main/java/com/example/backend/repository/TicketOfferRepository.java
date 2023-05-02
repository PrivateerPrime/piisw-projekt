package com.example.backend.repository;

import com.example.backend.entity.TicketOffer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketOfferRepository extends JpaRepository<TicketOffer, Long> {
}
