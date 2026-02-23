package com.wfms.worksphere_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEmployeeRequest {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String jobTitle;
    private String hireDate;
    private String departmentId;
    private String managerId;
}
