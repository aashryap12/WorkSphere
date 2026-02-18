package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Department;

@Service
public class DepartmentService {
    public List<Department> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Department getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Department create(Department department) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Department update(ObjectId id, Department department) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
