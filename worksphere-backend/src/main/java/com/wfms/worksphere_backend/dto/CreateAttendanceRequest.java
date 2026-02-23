package com.wfms.worksphere_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateAttendanceRequest {
    private String employeeId;
    private String workDate;
    private String checkInAt;
    private String checkOutAt;
    private String status;
    private String notes;
}
