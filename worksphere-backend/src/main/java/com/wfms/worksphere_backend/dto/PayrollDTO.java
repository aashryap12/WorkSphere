package com.wfms.worksphere_backend.dto;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PayrollDTO {
    private String id;
    private String employeeId;
    private String employeeName;
    private String employeeCode;
    private String department;
    private String periodStart;
    private String periodEnd;
    private String payPeriodStart;
    private String payPeriodEnd;
    private String payDate;
    private BigDecimal grossPay;
    private BigDecimal grossSalary;
    private BigDecimal netPay;
    private BigDecimal taxAmount;
    private BigDecimal deductions;
    private String status;
    private Instant paidAt;
}
