package com.wfms.worksphere_backend.service;

import java.time.Instant;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Request;
import com.wfms.worksphere_backend.repository.RequestRepository;

@Service
public class RequestService {
    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    public List<Request> getUserRequests(ObjectId userId) {
        return requestRepository.findByUserId(userId);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<Request> getUserRequestsByStatus(ObjectId userId, String status) {
        return requestRepository.findByUserIdAndStatus(userId, status);
    }

    public Request createRequest(Request request) {
        request.setId(null);
        request.setStatus("pending");
        request.setApprovedBy(null); // Ensure approvedBy is not set on creation
        request.setCreatedAt(Instant.now());
        request.setUpdatedAt(Instant.now());
        
        if (request.getSubmittedDate() == null) {
            request.setSubmittedDate(Instant.now().toString());
        }
        
        return requestRepository.save(request);
    }

    public Request getRequestById(String id) {
        return requestRepository.findById(id).orElse(null);
    }

    public Request updateRequest(String id, Request updatedRequest) {
        Request existing = requestRepository.findById(id).orElse(null);
        if (existing == null) return null;

        if (updatedRequest.getType() != null) {
            existing.setType(updatedRequest.getType());
        }
       
        if (updatedRequest.getDescription() != null) {
            existing.setDescription(updatedRequest.getDescription());
        }
        if (updatedRequest.getStartDate() != null) {
            existing.setStartDate(updatedRequest.getStartDate());
        }
        if (updatedRequest.getEndDate() != null) {
            existing.setEndDate(updatedRequest.getEndDate());
        }
       
        if (updatedRequest.getStatus() != null) {
            existing.setStatus(updatedRequest.getStatus());
        }

        existing.setUpdatedAt(Instant.now());
        return requestRepository.save(existing);
    }

    public void deleteRequest(String id) {
        requestRepository.deleteById(id);
    }

    public Request approveRequest(String id, String approvedBy) {
        Request existing = requestRepository.findById(id).orElse(null);
        if (existing == null) {
            System.out.println("Request not found: " + id);
            return null;
        }

        System.out.println("Setting approval - ID: " + id + ", approvedBy: " + approvedBy);
        existing.setStatus("approved");
        existing.setApprovedBy(approvedBy);
        existing.setUpdatedAt(Instant.now());
        Request saved = requestRepository.save(existing);
        System.out.println("Request saved - approvedBy field: " + saved.getApprovedBy());
        return saved;
    }

    public Request rejectRequest(String id, String rejectedBy) {
        Request existing = requestRepository.findById(id).orElse(null);
        if (existing == null) {
            System.out.println("Request not found: " + id);
            return null;
        }

        System.out.println("Setting rejection - ID: " + id + ", rejectedBy: " + rejectedBy);
        existing.setStatus("rejected");
        existing.setApprovedBy(rejectedBy);
        existing.setUpdatedAt(Instant.now());
        Request saved = requestRepository.save(existing);
        System.out.println("Request saved - approvedBy field: " + saved.getApprovedBy());
        return saved;
    }

    private ObjectId getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return new ObjectId(auth.getPrincipal().toString());
    }
}
