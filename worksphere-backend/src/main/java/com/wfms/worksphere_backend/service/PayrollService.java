package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Payroll;

@Service
public class PayrollService {
    public List<Payroll> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Payroll getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Payroll create(Payroll payroll) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Payroll update(ObjectId id, Payroll payroll) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
