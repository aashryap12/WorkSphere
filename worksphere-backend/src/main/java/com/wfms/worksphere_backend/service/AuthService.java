package com.wfms.worksphere_backend.service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.ApiResponse;
import com.wfms.worksphere_backend.dto.LoginRequest;
import com.wfms.worksphere_backend.dto.LoginResponse;
import com.wfms.worksphere_backend.dto.RegisterRequest;
import com.wfms.worksphere_backend.model.User;
import com.wfms.worksphere_backend.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmailOrUsername(request.getUsernameOrEmail(), request.getUsernameOrEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!user.isActive()) {
            throw new RuntimeException("Account is disabled");
        }

        // Generate simple token (in production, use JWT)
        String token = UUID.randomUUID().toString();

        return new LoginResponse(
                token,
                user.getId().toString(),
                user.getUsername(),
                user.getRole()
        );
    }

    public ApiResponse<Void> register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create username from email
        String username = request.getEmail().split("@")[0];
        
        // Check if username exists, if so add number
        int counter = 1;
        String finalUsername = username;
        while (userRepository.findByUsername(finalUsername).isPresent()) {
            finalUsername = username + counter;
            counter++;
        }

        // Create new user
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(finalUsername);
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : "employee");
        user.setActive(true);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());

        userRepository.save(user);

        return new ApiResponse<>(true, "Registration successful", null);
    }
}
