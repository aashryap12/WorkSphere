package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Shift;

@Service
public class ShiftService {
    public List<Shift> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Shift getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Shift create(Shift shift) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Shift update(ObjectId id, Shift shift) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
