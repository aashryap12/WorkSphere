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
@Document(collection = "status_tracking")
public class StatusTracking {
    @Id
    private ObjectId id;
    private ObjectId requestId;
    private String status;
    private String note;
    private ObjectId changedByUserId;
    private Instant changedAt;
}
