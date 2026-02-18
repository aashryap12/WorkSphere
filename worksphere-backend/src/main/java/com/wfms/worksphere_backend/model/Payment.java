package com.wfms.worksphere_backend.model;

import java.math.BigDecimal;
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
@Document(collection = "payments")
public class Payment {
    @Id
    private ObjectId id;
    private ObjectId requestId;
    private BigDecimal amount;
    private String currency;
    private String method;
    private String status;
    private Instant paidAt;
    private Instant createdAt;
    private Instant updatedAt;
}
