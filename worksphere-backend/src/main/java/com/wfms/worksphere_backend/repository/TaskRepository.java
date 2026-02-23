package com.wfms.worksphere_backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wfms.worksphere_backend.model.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByAssignedTo(ObjectId employeeId);
    List<Task> findByAssignedBy(ObjectId managerId);
    List<Task> findByStatus(String status);
    List<Task> findByAssignedToAndStatus(ObjectId employeeId, String status);
    List<Task> findByAssignedByAndStatus(ObjectId managerId, String status);
    List<Task> findByDueDateBetween(LocalDate start, LocalDate end);
    List<Task> findByAssignedToAndDueDateBetween(ObjectId employeeId, LocalDate start, LocalDate end);
    List<Task> findByPriority(String priority);
    List<Task> findByCategory(String category);
}
