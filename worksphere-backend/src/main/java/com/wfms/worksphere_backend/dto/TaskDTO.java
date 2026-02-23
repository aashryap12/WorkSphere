package com.wfms.worksphere_backend.dto;

import java.time.Instant;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskDTO {
    private String id;
    private String title;
    private String description;
    private String assignedTo;           // Employee ID as string
    private String assignedToName;       // Employee full name
    private String assignedBy;           // Manager's user ID as string
    private String assignedByName;       // Manager's name
    private String priority;
    private String status;
    private LocalDate dueDate;
    private LocalDate startDate;
    private String category;
    private Integer estimatedHours;
    private Integer actualHours;
    private String notes;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant completedAt;
}
