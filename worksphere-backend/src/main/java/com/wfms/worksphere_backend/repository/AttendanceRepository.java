package com.wfms.worksphere_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wfms.worksphere_backend.model.Attendance;

@Repository
public interface AttendanceRepository extends MongoRepository<Attendance, ObjectId> {
    List<Attendance> findByWorkDate(LocalDate workDate);
    List<Attendance> findByEmployeeId(ObjectId employeeId);
    List<Attendance> findByEmployeeIdAndWorkDate(ObjectId employeeId, LocalDate workDate);
    List<Attendance> findByWorkDateBetween(LocalDate startDate, LocalDate endDate);
    List<Attendance> findByStatus(String status);
    List<Attendance> findByWorkDateAndStatus(LocalDate workDate, String status);
}
