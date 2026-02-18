package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Request;

@Service
public class RequestService {
    public List<Request> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Request getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Request create(Request request) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Request update(ObjectId id, Request request) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
