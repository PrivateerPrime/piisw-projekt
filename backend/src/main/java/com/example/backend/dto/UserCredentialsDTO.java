package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserCredentialsDTO {
    @NotNull private String username;
    @NotNull private String password;
}