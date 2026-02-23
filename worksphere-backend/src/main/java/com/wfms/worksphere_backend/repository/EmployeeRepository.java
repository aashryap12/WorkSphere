package com.wfms.worksphere_backend.repository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wfms.worksphere_backend.model.Employee;

public interface EmployeeRepository extends MongoRepository<Employee, ObjectId> {
    Optional<Employee> findByEmployeeCode(String employeeCode);
    Optional<Employee> findByEmail(String email);
    Optional<Employee> findByUserId(ObjectId userId);
    List<Employee> findByDepartmentId(ObjectId departmentId);
    List<Employee> findByEmploymentStatus(String employmentStatus);
    List<Employee> findByManagerEmployeeId(ObjectId managerEmployeeId);
    boolean existsByEmail(String email);
    boolean existsByEmployeeCode(String employeeCode);
}
