package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Vendor;

@Service
public class VendorService {
    public List<Vendor> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Vendor getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Vendor create(Vendor vendor) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Vendor update(ObjectId id, Vendor vendor) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
