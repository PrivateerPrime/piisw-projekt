package com.example.backend.dto;


import com.example.backend.entity.Ticket;

public record TicketDTO(boolean isValid, Ticket ticket) {
}
