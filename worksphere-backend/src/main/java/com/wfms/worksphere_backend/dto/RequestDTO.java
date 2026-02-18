package com.wfms.worksphere_backend.dto;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestDTO {
    private ObjectId id;
    private String type;
    private String title;
    private String description;
    private ObjectId userId;
    private ObjectId vendorId;
    private ObjectId paymentId;
    private String status;
}
