package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Attendance;

@Service
public class AttendanceService {
    public List<Attendance> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Attendance getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Attendance create(Attendance attendance) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Attendance update(ObjectId id, Attendance attendance) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
