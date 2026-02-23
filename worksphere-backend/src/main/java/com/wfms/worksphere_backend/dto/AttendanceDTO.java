package com.wfms.worksphere_backend.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDTO {
    private String id;
    private String employeeId;
    private String employeeName;
    private String employeeCode;
    private String department;
    private String shiftId;
    private String workDate;
    private Instant checkInAt;
    private Instant checkOutAt;
    private String status;
    private String notes;
}
