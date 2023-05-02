package com.example.backend.controller;

import com.example.backend.dto.ErrorDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid UserDTO userDTO){
        if(userService.userExists(userDTO.getUsername()))
            return ResponseEntity.badRequest().body(new ErrorDTO("User with this username already exists"));
        return ResponseEntity.ok(authService.register(userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid UserDTO userDTO){
        try {
            return ResponseEntity.ok(authService.login(userDTO));
        } catch (AuthenticationException e){
            return ResponseEntity.badRequest().body(new ErrorDTO("Invalid user credentials"));
        }
    }
}
