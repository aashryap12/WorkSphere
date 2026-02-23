package com.wfms.worksphere_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wfms.worksphere_backend.model.Payroll;

@Repository
public interface PayrollRepository extends MongoRepository<Payroll, ObjectId> {
    List<Payroll> findByEmployeeId(ObjectId employeeId);
    List<Payroll> findByStatus(String status);
    List<Payroll> findByPeriodStartBetween(LocalDate startDate, LocalDate endDate);
    List<Payroll> findByPeriodEndBetween(LocalDate startDate, LocalDate endDate);
    List<Payroll> findByEmployeeIdAndStatus(ObjectId employeeId, String status);
    List<Payroll> findByPeriodStartGreaterThanEqualAndPeriodEndLessThanEqual(LocalDate start, LocalDate end);
}
