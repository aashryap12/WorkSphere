package com.wfms.worksphere_backend.service;

import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.ApiResponse;
import com.wfms.worksphere_backend.dto.LoginRequest;
import com.wfms.worksphere_backend.dto.LoginResponse;
import com.wfms.worksphere_backend.dto.RegisterRequest;

@Service
public class AuthService {
    public LoginResponse login(LoginRequest request) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public ApiResponse<Void> register(RegisterRequest request) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
