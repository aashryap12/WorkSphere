package com.wfms.worksphere_backend.model;

import java.time.Instant;
import java.time.LocalDate;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;
    private String title;
    private String description;
    private ObjectId assignedTo;      // Employee ID
    private ObjectId assignedBy;      // Manager's user ID
    private String priority;          // low, medium, high, urgent
    private String status;            // pending, in-progress, completed, cancelled
    private LocalDate dueDate;
    private LocalDate startDate;
    private String category;          // project, meeting, review, training, other
    private Integer estimatedHours;
    private Integer actualHours;
    private String notes;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant completedAt;
}
