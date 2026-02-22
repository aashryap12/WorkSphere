package com.wfms.worksphere_backend.security;

import java.io.IOException;
import java.util.List;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        try {
            String token = extractToken(request);
            
            if (token != null) {
                System.out.println("Token found, validating...");
                
                if (jwtUtil.validateToken(token)) {
                    String userId = jwtUtil.getUserIdFromToken(token);
                    String username = jwtUtil.getUsernameFromToken(token);
                    String role = jwtUtil.getRoleFromToken(token);
                    
                    System.out.println("Token valid - userId: " + userId + ", username: " + username + ", role: " + role);
                    
                    if (userId != null) {
                        role = role == null ? "employee" : role;
                        List<SimpleGrantedAuthority> authorities = List.of(
                            new SimpleGrantedAuthority("ROLE_" + role.toUpperCase())
                        );
                        
                        UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(userId, null, authorities);
                        
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        System.out.println("Authentication set in SecurityContext");
                    }
                } else {
                    System.out.println("Token validation failed");
                }
            } else {
                System.out.println("No token found in request");
            }
        } catch (Exception e) {
            System.err.println("Exception in JwtAuthenticationFilter: " + e.getMessage());
            e.printStackTrace();
        }
        
        filterChain.doFilter(request, response);
    }

    private String extractToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization header: " + authHeader);
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7).trim();
            System.out.println("Extracted token from Authorization header: " + token.substring(0, Math.min(20, token.length())) + "...");
            return token;
        }
        
        String altHeader = request.getHeader("X-Auth-Token");
        if (altHeader != null && !altHeader.isBlank()) {
            System.out.println("Using X-Auth-Token header");
            return altHeader.trim();
        }
        
        System.out.println("No token header found");
        return null;
    }
}
