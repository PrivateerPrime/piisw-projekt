package com.example.backend.service;

import com.example.backend.dto.TokenDTO;
import com.example.backend.dto.UserCredentialsDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JWTService jwtService;
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public TokenDTO register(UserCredentialsDTO userCredentialsDTO) {
        User user = User.builder()
                .username(userCredentialsDTO.getUsername())
                .role(Role.USER)
                .password(passwordEncoder.encode(userCredentialsDTO.getPassword()))
                .build();
        userService.save(user);
        return new TokenDTO(jwtService.generateToken(user));
    }

    public TokenDTO login(UserCredentialsDTO userCredentialsDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userCredentialsDTO.getUsername(),
                        userCredentialsDTO.getPassword()
                )
        );
        User user = userService.getUserByUsername(userCredentialsDTO.getUsername())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return new TokenDTO(jwtService.generateToken(user));
    }

}
