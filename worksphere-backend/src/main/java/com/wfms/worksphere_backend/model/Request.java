package com.wfms.worksphere_backend.model;

import java.time.Instant;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "requests")
public class Request {
    @Id
    private String id;
    private String type;
    private String description;
    private String startDate;
    private String endDate;
    private String submittedDate;
    private String approvedBy;
    private ObjectId userId;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;
}
