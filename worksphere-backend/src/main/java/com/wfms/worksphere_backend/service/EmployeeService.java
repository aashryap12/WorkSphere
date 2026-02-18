package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.Employee;

@Service
public class EmployeeService {
    public List<Employee> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Employee getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Employee create(Employee employee) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public Employee update(ObjectId id, Employee employee) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
