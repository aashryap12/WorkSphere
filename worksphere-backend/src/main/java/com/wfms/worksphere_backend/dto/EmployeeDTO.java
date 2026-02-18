package com.wfms.worksphere_backend.dto;

import org.bson.types.ObjectId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private ObjectId id;
    private String employeeCode;
    private String firstName;
    private String lastName;
    private String email;
    private ObjectId departmentId;
}
