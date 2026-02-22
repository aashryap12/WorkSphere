package com.wfms.worksphere_backend.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.wfms.worksphere_backend.model.Request;
import com.wfms.worksphere_backend.security.JwtUtil;
import com.wfms.worksphere_backend.service.RequestService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService requestService;
    private final JwtUtil jwtUtil;

    public RequestController(RequestService requestService, JwtUtil jwtUtil) {
        this.requestService = requestService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAllUserRequests() {
        try {
            ObjectId userId = getUserIdFromAuth();
            String role = getUserRoleFromAuth();
            
            System.out.println("=== GET /api/requests ===");
            System.out.println("userId: " + userId);
            System.out.println("role: " + role);
            
            List<Request> requests;
            
            // If user is a manager, return all requests for approval
            if (role != null && (role.equalsIgnoreCase("ROLE_MANAGER") || role.equalsIgnoreCase("manager"))) {
                requests = requestService.getAllRequests();
                System.out.println("Manager role detected - returning all requests: " + requests.size());
            } else if (userId != null) {
                // If employee/user, return only their own requests
                requests = requestService.getUserRequests(userId);
                System.out.println("Returning " + requests.size() + " requests for userId: " + userId);
            } else {
                // If not authenticated, return ALL requests for testing
                requests = requestService.getAllRequests();
                System.out.println("No authentication - returning all requests: " + requests.size());
            }
            
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            System.err.println("Error in getAllUserRequests: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/manager/all")
    public ResponseEntity<List<Request>> getAllRequestsForManager() {
        try {
            String role = getUserRoleFromAuth();
            
            System.out.println("=== GET /api/requests/manager/all ===");
            System.out.println("role: " + role);
            
            // Check if user has manager role
            if (role == null || (!role.equalsIgnoreCase("ROLE_MANAGER") && !role.equalsIgnoreCase("manager"))) {
                System.out.println("Access denied - user is not a manager. Role received: " + role);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            
            List<Request> requests = requestService.getAllRequests();
            System.out.println("✓ Returning all requests for manager: " + requests.size());
            
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            System.err.println("Error in getAllRequestsForManager: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequest(@PathVariable String id) {
        try {
            Request request = requestService.getRequestById(id);
            if (request == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(request);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        try {
            ObjectId userId = getUserIdFromAuth();
            request.setUserId(userId);
            Request savedRequest = requestService.createRequest(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRequest);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable String id, @RequestBody Request request) {
        try {
            Request updated = requestService.updateRequest(id, request);
            if (updated == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable String id) {
        try {
            requestService.deleteRequest(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Request> approveRequest(@PathVariable String id) {
        try {
            // Verify user is a manager
            String role = getUserRoleFromAuth();
            if (role == null || (!role.equalsIgnoreCase("ROLE_MANAGER") && !role.equalsIgnoreCase("manager"))) {
                System.out.println("Unauthorized approval attempt - user is not a manager. Role: " + role);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            
            String managerName = getManagerNameFromAuth();
            System.out.println("Approving request " + id + " by manager: " + managerName + " (role: " + role + ")");
            Request approved = requestService.approveRequest(id, managerName);
            if (approved == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(approved);
        } catch (Exception e) {
            System.err.println("Error approving request: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Request> rejectRequest(@PathVariable String id) {
        try {
            // Verify user is a manager
            String role = getUserRoleFromAuth();
            if (role == null || (!role.equalsIgnoreCase("ROLE_MANAGER") && !role.equalsIgnoreCase("manager"))) {
                System.out.println("Unauthorized rejection attempt - user is not a manager. Role: " + role);
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            
            String managerName = getManagerNameFromAuth();
            System.out.println("Rejecting request " + id + " by manager: " + managerName + " (role: " + role + ")");
            Request rejected = requestService.rejectRequest(id, managerName);
            if (rejected == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(rejected);
        } catch (Exception e) {
            System.err.println("Error rejecting request: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    private ObjectId getUserIdFromAuth() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated()) {
                System.out.println("No authentication found");
                return null;
            }
            
            Object principal = auth.getPrincipal();
            if (principal == null) {
                System.out.println("Principal is null");
                return null;
            }
            
            String userIdStr = principal.toString();
            System.out.println("Principal: " + userIdStr + ", length: " + userIdStr.length());
            
            // Check if it's a valid ObjectId (24 hex characters)
            if (userIdStr.length() == 24) {
                try {
                    return new ObjectId(userIdStr);
                } catch (IllegalArgumentException e) {
                    System.out.println("Invalid ObjectId format: " + userIdStr);
                    return null;
                }
            }
            
            System.out.println("UserId is not a valid ObjectId length");
            return null;
        } catch (Exception e) {
            System.err.println("Error extracting userId: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    private String getManagerNameFromAuth() {
        try {
            HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            String token = extractTokenFromRequest(request);
            
            System.out.println("Extracting manager name from token...");
            if (token != null) {
                System.out.println("Token found: " + token.substring(0, Math.min(20, token.length())) + "...");
                if (jwtUtil.validateToken(token)) {
                    String username = jwtUtil.getUsernameFromToken(token);
                    String role = jwtUtil.getRoleFromToken(token);
                    System.out.println("Token validated - username: " + username + ", role: " + role);
                    return username != null ? username : "Manager";
                } else {
                    System.out.println("Token validation failed");
                }
            } else {
                System.out.println("No token found in request");
            }
            return "Manager";
        } catch (Exception e) {
            System.err.println("Error extracting manager name: " + e.getMessage());
            e.printStackTrace();
            return "Manager";
        }
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return request.getHeader("X-Auth-Token");
    }

    private String getUserRoleFromAuth() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getAuthorities() != null && !auth.getAuthorities().isEmpty()) {
                return auth.getAuthorities().iterator().next().getAuthority();
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}