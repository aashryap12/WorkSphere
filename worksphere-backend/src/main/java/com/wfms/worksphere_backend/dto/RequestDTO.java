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
    private String description;
    private String startDate;
    private String endDate;
    private String submittedDate;
    private String approvedBy;
    private ObjectId userId;
    private String status;
}
