package com.wfms.worksphere_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wfms.worksphere_backend.model.Attendance;

public interface AttendanceRepository extends MongoRepository<Attendance, ObjectId> {
}
