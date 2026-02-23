package com.wfms.worksphere_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePayrollRequest {
    private String employeeId;
    private String periodStart;
    private String periodEnd;
    private String grossPay;
    private String taxAmount;
    private String deductions;
    private String status;
}
