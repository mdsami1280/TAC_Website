package com.aarya.controller;

import com.aarya.model.Admin;
import com.aarya.repository.AdminRepository;
import com.aarya.security.JwtService;
import com.aarya.security.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@Valid @RequestBody Admin admin) {
        if (adminRepository.existsByUsername(admin.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (adminRepository.existsByEmail(admin.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);

        UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getUsername());
        String token = jwtService.generateToken(userDetails);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("message", "Admin registered successfully");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> credentials) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    credentials.get("username"),
                    credentials.get("password")
                )
            );

            Admin admin = adminRepository.findByUsername(credentials.get("username"))
                    .orElseThrow(() -> new RuntimeException("Admin not found"));
            
            UserDetails userDetails = userDetailsService.loadUserByUsername(credentials.get("username"));
            String token = jwtService.generateToken(userDetails);
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "username", admin.getUsername(),
                "email", admin.getEmail() != null ? admin.getEmail() : "",
                "fullName", admin.getFullName() != null ? admin.getFullName() : ""
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }
} 