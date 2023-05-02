package com.example.backend.controller;

import com.example.backend.dto.ErrorDTO;
import com.example.backend.dto.TicketDTO;
import com.example.backend.entity.Ticket;
import com.example.backend.entity.TicketOffer;
import com.example.backend.entity.User;
import com.example.backend.service.TicketService;
import com.example.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("ticket")
public class TicketController {

    private final TicketService ticketService;
    private final UserService userService;
    @GetMapping("/offer")
    public ResponseEntity<List<TicketOffer>> getOffer(){
        return ResponseEntity.ok(ticketService.getAllTicketOffer());
    }

    @GetMapping("/buy")
    public ResponseEntity<?> buyTicket(@RequestParam Long id, Principal principal){
        try{
            User user = userService.getUserByUsername(principal.getName()).orElseThrow(
                    () -> new EntityNotFoundException(String.format("User with name %s not found", principal.getName()))
            );
            return ResponseEntity.ok(ticketService.buyTicket(id, user));
        } catch (EntityNotFoundException|NullPointerException e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserTickets(Principal principal){
        return ResponseEntity.ok(ticketService.getTicketsByUsername(principal.getName()));
    }

    @GetMapping("/activate")
    public ResponseEntity<?> activateTicket(@RequestParam Long ticketId,
                                            @RequestParam Long vehicleNumber,
                                            Principal principal){
        List<Ticket> ticketList = ticketService.getTicketsByUsername(principal.getName());
        Optional<Ticket> ticketOptional =
                ticketList.stream().filter(ticket -> ticket.getId().equals(ticketId)).findFirst();
        if (ticketOptional.isEmpty()) return ResponseEntity.notFound().build();
        Ticket ticket = ticketService.activateTicket(ticketOptional.get(), vehicleNumber);
        return ResponseEntity.ok(
                new TicketDTO(
                        ticket.checkValidity(vehicleNumber),
                        ticket));
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkTicket(@RequestParam Long ticketId, @RequestParam Long vehicleNumber){
        Optional<Ticket> ticketOptional = ticketService.getTicketById(ticketId);
        if (ticketOptional.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(
                new TicketDTO(
                        ticketOptional.get().checkValidity(vehicleNumber),
                        ticketOptional.get()));
    }
}
