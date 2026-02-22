package com.wfms.worksphere_backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    private final SecretKey signKey;
    private final long expirationTime;

    public JwtUtil(@Value("${jwt.secret:supersecretkeythatneedstobeatleast256bitslong}") String secret,
                   @Value("${jwt.expiration:86400000}") long expirationTime) {
        this.signKey = Keys.hmacShaKeyFor(secret.getBytes());
        this.expirationTime = expirationTime; // milliseconds
    }

    public String generateToken(String userId, String username, String role) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .subject(userId)
                .claim("username", username)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(signKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUserIdFromToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(signKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (Exception e) {
            return null;
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            return (String) Jwts.parser()
                    .verifyWith(signKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .get("username");
        } catch (Exception e) {
            return null;
        }
    }

    public String getRoleFromToken(String token) {
        try {
            return (String) Jwts.parser()
                    .verifyWith(signKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .get("role");
        } catch (Exception e) {
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(signKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            System.out.println("JWT validation failed: " + e.getMessage());
            return false;
        }
    }
}
