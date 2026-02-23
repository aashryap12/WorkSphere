package com.wfms.worksphere_backend.service;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.ApiResponse;
import com.wfms.worksphere_backend.dto.LoginRequest;
import com.wfms.worksphere_backend.dto.LoginResponse;
import com.wfms.worksphere_backend.dto.RegisterRequest;
import com.wfms.worksphere_backend.model.Employee;
import com.wfms.worksphere_backend.model.User;
import com.wfms.worksphere_backend.repository.EmployeeRepository;
import com.wfms.worksphere_backend.repository.UserRepository;
import com.wfms.worksphere_backend.security.JwtUtil;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, EmployeeRepository employeeRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.jwtUtil = jwtUtil;
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

        // Generate JWT token
        String token = jwtUtil.generateToken(
                user.getId().toString(),
                user.getUsername(),
                user.getRole()
        );

        return new LoginResponse(
                token,
                user.getId().toString(),
                user.getUsername(),
                user.getEmail(),
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
        String role = request.getRole() != null ? request.getRole() : "employee";
        user.setRole(role);
        user.setActive(true);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());

        User savedUser = userRepository.save(user);

        // Create Employee record for employees and managers
        if ("employee".equalsIgnoreCase(role) || "manager".equalsIgnoreCase(role)) {
            createEmployeeRecord(savedUser);
        }

        return new ApiResponse<>(true, "Registration successful", null);
    }

    private void createEmployeeRecord(User user) {
        Employee employee = new Employee();
        employee.setUserId(user.getId());
        employee.setFirstName(user.getFirstName());
        employee.setLastName(user.getLastName());
        employee.setEmail(user.getEmail());
        employee.setEmployeeCode(generateEmployeeCode());
        employee.setJobTitle("employee".equalsIgnoreCase(user.getRole()) ? "Employee" : "Manager");
        employee.setHireDate(LocalDate.now());
        employee.setEmploymentStatus("Active");
        employee.setCreatedAt(Instant.now());
        employee.setUpdatedAt(Instant.now());
        
        employeeRepository.save(employee);
    }

    private String generateEmployeeCode() {
        long count = employeeRepository.count() + 1;
        return String.format("EMP-%03d", count);
    }
}
