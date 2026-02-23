package com.wfms.worksphere_backend.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wfms.worksphere_backend.model.Department;

public interface DepartmentRepository extends MongoRepository<Department, ObjectId> {
    Optional<Department> findByName(String name);
    Optional<Department> findByCode(String code);
}
