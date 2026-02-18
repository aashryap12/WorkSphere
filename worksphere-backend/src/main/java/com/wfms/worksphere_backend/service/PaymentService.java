package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Payment;

@Service
public class PaymentService {
    public List<Payment> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Payment getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Payment create(Payment payment) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Payment update(ObjectId id, Payment payment) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
