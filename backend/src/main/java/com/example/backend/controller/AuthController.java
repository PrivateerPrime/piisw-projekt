package com.example.backend.controller;

import com.example.backend.dto.ErrorDTO;
import com.example.backend.dto.UserCredentialsDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserCredentialsDTO userCredentialsDTO){
        if(userService.userExists(userCredentialsDTO.getUsername()))
            return ResponseEntity.badRequest().body(new ErrorDTO("User with this username already exists"));
        return ResponseEntity.ok(authService.register(userCredentialsDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserCredentialsDTO userCredentialsDTO){
        try {
            return ResponseEntity.ok(authService.login(userCredentialsDTO));
        } catch (AuthenticationException e){
            return ResponseEntity.badRequest().body(new ErrorDTO("Invalid user credentials"));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(Principal principal){
        try {
            User user = userService.getUserByUsername(principal.getName()).orElseThrow(
                    () -> new EntityNotFoundException(String.format("User with name %s not found", principal.getName()))
            );
            return ResponseEntity.ok(new UserDTO(user.getUsername(), user.getRole()));
        } catch (EntityNotFoundException e){
            return ResponseEntity.badRequest().body(new ErrorDTO(e.getMessage()));
        }
    }
}
