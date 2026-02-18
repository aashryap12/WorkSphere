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
    private ObjectId id;
    private String type;
    private String title;
    private String description;
    private ObjectId userId;
    private ObjectId vendorId;
    private ObjectId paymentId;
    private String status;
    private Instant createdAt;
    private Instant updatedAt;
}
