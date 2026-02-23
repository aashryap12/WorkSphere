package com.wfms.worksphere_backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {
    private String id;
    private String userId;
    private String employeeCode;
    private String firstName;
    private String lastName;
    private String name;
    private String email;
    private String jobTitle;
    private LocalDate hireDate;
    private String startDate;
    private String employmentStatus;
    private String status;
    private String departmentId;
    private String departmentName;
    private String department;
    private String managerId;
    private String managerName;
    private String manager;
}
