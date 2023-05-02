package com.example.backend.service;

import com.example.backend.entity.*;
import com.example.backend.repository.TicketOfferRepository;
import com.example.backend.repository.TicketRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final TicketRepository ticketRepository;
    private final TicketOfferRepository ticketOfferRepository;

    public Ticket buyTicket(Long ticketOfferId, User user) {
        TicketOffer ticketOffer = getTicketOfferById(ticketOfferId);
        Ticket ticket = createTicket(ticketOffer, user);
        ticketRepository.save(ticket);
        return ticket;
    }

    private Ticket createTicket(TicketOffer ticketOffer, User user) {
        Ticket ticket;
        switch (ticketOffer.getTicketType()) {
            case RIDE_TICKET -> ticket = new RideTicket();
            case TIME_TICKET -> ticket = TimeTicket.builder()
                    .validityPeriod(ticketOffer.getValidityPeriod()).build();
            case SEASON_TICKET -> ticket = SeasonTicket.builder()
                    .expirationDate(LocalDateTime.now().plusDays(ticketOffer.getValidityPeriod())).build();
            default -> throw new IllegalStateException("Unexpected value: " + ticketOffer.getTicketType());
        }
        ticket.setUser(user);
        ticket.setPrice(ticketOffer.getPrice());
        ticket.setIsDiscounted(ticketOffer.isDiscounted());
        return ticket;
    }

    public List<TicketOffer> getAllTicketOffer(){
        return ticketOfferRepository.findAll();
    }

    public TicketOffer getTicketOfferById(Long id){
        return ticketOfferRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("TicketOffer entity with id = %d dose not exist", id)));
    }

    public List<Ticket> getTicketsByUsername(String username){
        return ticketRepository.findAllByUserUsername(username);
    }

    public Optional<Ticket> getTicketById(Long id){
        return ticketRepository.findById(id);
    }

    public Ticket activateTicket(Ticket ticket, Long vehicleNumber){
        ticket.activateTicket(vehicleNumber);
        ticketRepository.save(ticket);
        return ticket;
    }
}
