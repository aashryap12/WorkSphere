package com.wfms.worksphere_backend.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.AttendanceDTO;
import com.wfms.worksphere_backend.dto.CreateAttendanceRequest;
import com.wfms.worksphere_backend.model.Attendance;
import com.wfms.worksphere_backend.model.Employee;
import com.wfms.worksphere_backend.repository.AttendanceRepository;
import com.wfms.worksphere_backend.repository.DepartmentRepository;
import com.wfms.worksphere_backend.repository.EmployeeRepository;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy", Locale.ENGLISH);

    public AttendanceService(AttendanceRepository attendanceRepository, 
                            EmployeeRepository employeeRepository,
                            DepartmentRepository departmentRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<AttendanceDTO> getAllAttendance() {
        List<Attendance> records = attendanceRepository.findAll();
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByDate(LocalDate date) {
        List<Attendance> records = attendanceRepository.findByWorkDate(date);
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByEmployee(ObjectId employeeId) {
        List<Attendance> records = attendanceRepository.findByEmployeeId(employeeId);
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByDateRange(LocalDate startDate, LocalDate endDate) {
        List<Attendance> records = attendanceRepository.findByWorkDateBetween(startDate, endDate);
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceDTO getAttendanceById(ObjectId id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));
        return convertToDTO(attendance);
    }

    public AttendanceDTO createAttendance(CreateAttendanceRequest request) {
        Attendance attendance = new Attendance();

        // Find employee by ID or code
        ObjectId employeeId = findEmployeeId(request.getEmployeeId());
        attendance.setEmployeeId(employeeId);

        // Parse work date
        if (request.getWorkDate() != null && !request.getWorkDate().isEmpty()) {
            try {
                attendance.setWorkDate(LocalDate.parse(request.getWorkDate()));
            } catch (Exception e) {
                attendance.setWorkDate(LocalDate.now());
            }
        } else {
            attendance.setWorkDate(LocalDate.now());
        }

        // Parse check-in time
        if (request.getCheckInAt() != null && !request.getCheckInAt().isEmpty()) {
            attendance.setCheckInAt(parseTimeToInstant(request.getCheckInAt(), attendance.getWorkDate()));
        }

        // Parse check-out time
        if (request.getCheckOutAt() != null && !request.getCheckOutAt().isEmpty()) {
            attendance.setCheckOutAt(parseTimeToInstant(request.getCheckOutAt(), attendance.getWorkDate()));
        }

        attendance.setStatus(request.getStatus() != null ? request.getStatus() : "Present");
        attendance.setNotes(request.getNotes());
        attendance.setCreatedAt(Instant.now());
        attendance.setUpdatedAt(Instant.now());

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToDTO(savedAttendance);
    }

    public AttendanceDTO updateAttendanceStatus(ObjectId id, String status) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));
        
        attendance.setStatus(status);
        attendance.setUpdatedAt(Instant.now());
        
        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToDTO(savedAttendance);
    }

    public AttendanceDTO updateAttendance(ObjectId id, CreateAttendanceRequest request) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found with id: " + id));

        if (request.getWorkDate() != null && !request.getWorkDate().isEmpty()) {
            try {
                attendance.setWorkDate(LocalDate.parse(request.getWorkDate()));
            } catch (Exception e) {
                // Keep existing date
            }
        }

        if (request.getCheckInAt() != null && !request.getCheckInAt().isEmpty()) {
            attendance.setCheckInAt(parseTimeToInstant(request.getCheckInAt(), attendance.getWorkDate()));
        }

        if (request.getCheckOutAt() != null && !request.getCheckOutAt().isEmpty()) {
            attendance.setCheckOutAt(parseTimeToInstant(request.getCheckOutAt(), attendance.getWorkDate()));
        }

        if (request.getStatus() != null) {
            attendance.setStatus(request.getStatus());
        }

        if (request.getNotes() != null) {
            attendance.setNotes(request.getNotes());
        }

        attendance.setUpdatedAt(Instant.now());

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToDTO(savedAttendance);
    }

    public void deleteAttendance(ObjectId id) {
        if (!attendanceRepository.existsById(id)) {
            throw new RuntimeException("Attendance record not found with id: " + id);
        }
        attendanceRepository.deleteById(id);
    }

    private ObjectId findEmployeeId(String identifier) {
        if (identifier == null || identifier.isEmpty()) {
            throw new RuntimeException("Employee identifier is required");
        }

        // Try to parse as ObjectId first
        try {
            return new ObjectId(identifier);
        } catch (IllegalArgumentException e) {
            // Not a valid ObjectId, try to find by employee code
            Employee employee = employeeRepository.findByEmployeeCode(identifier)
                    .orElseThrow(() -> new RuntimeException("Employee not found with identifier: " + identifier));
            return employee.getId();
        }
    }

    private Instant parseTimeToInstant(String timeStr, LocalDate date) {
        try {
            LocalTime time = LocalTime.parse(timeStr);
            return date.atTime(time).atZone(ZoneId.systemDefault()).toInstant();
        } catch (Exception e) {
            // Return null if parsing fails
            return null;
        }
    }

    private AttendanceDTO convertToDTO(Attendance attendance) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(attendance.getId().toHexString());
        
        if (attendance.getEmployeeId() != null) {
            dto.setEmployeeId(attendance.getEmployeeId().toHexString());
            
            // Fetch employee details
            employeeRepository.findById(attendance.getEmployeeId()).ifPresent(employee -> {
                dto.setEmployeeName(employee.getFirstName() + " " + employee.getLastName());
                dto.setEmployeeCode(employee.getEmployeeCode());
                
                // Fetch department name
                if (employee.getDepartmentId() != null) {
                    departmentRepository.findById(employee.getDepartmentId()).ifPresent(department -> {
                        dto.setDepartment(department.getName());
                    });
                }
            });
        }

        if (attendance.getShiftId() != null) {
            dto.setShiftId(attendance.getShiftId().toHexString());
        }

        if (attendance.getWorkDate() != null) {
            dto.setWorkDate(attendance.getWorkDate().format(DATE_FORMATTER));
        }

        dto.setCheckInAt(attendance.getCheckInAt());
        dto.setCheckOutAt(attendance.getCheckOutAt());
        dto.setStatus(attendance.getStatus());
        dto.setNotes(attendance.getNotes());

        return dto;
    }
}
