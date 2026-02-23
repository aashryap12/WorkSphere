package com.wfms.worksphere_backend.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.CreateEmployeeRequest;
import com.wfms.worksphere_backend.dto.EmployeeDTO;
import com.wfms.worksphere_backend.model.Department;
import com.wfms.worksphere_backend.model.Employee;
import com.wfms.worksphere_backend.repository.DepartmentRepository;
import com.wfms.worksphere_backend.repository.EmployeeRepository;

@Service
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy", Locale.ENGLISH);
    
    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }
    
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public EmployeeDTO getEmployeeById(ObjectId id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        return convertToDTO(employee);
    }
    
    public EmployeeDTO getEmployeeByCode(String employeeCode) {
        Employee employee = employeeRepository.findByEmployeeCode(employeeCode)
                .orElseThrow(() -> new RuntimeException("Employee not found with code: " + employeeCode));
        return convertToDTO(employee);
    }
    
    public List<EmployeeDTO> getEmployeesByDepartment(ObjectId departmentId) {
        List<Employee> employees = employeeRepository.findByDepartmentId(departmentId);
        return employees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<EmployeeDTO> getEmployeesByStatus(String status) {
        List<Employee> employees = employeeRepository.findByEmploymentStatus(status);
        return employees.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public EmployeeDTO getEmployeeByUserId(ObjectId userId) {
        Employee employee = employeeRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employee not found for user id: " + userId));
        return convertToDTO(employee);
    }

    public EmployeeDTO getEmployeeByEmail(String email) {
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + email));
        return convertToDTO(employee);
    }
    
    public EmployeeDTO createEmployee(CreateEmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Employee with email already exists: " + request.getEmail());
        }
        
        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());

        employee.setJobTitle(request.getJobTitle());

        // Set userId if provided (links employee to user account)
        if (request.getUserId() != null && !request.getUserId().isEmpty()) {
            try {
                employee.setUserId(new ObjectId(request.getUserId()));
            } catch (IllegalArgumentException e) {
                // Invalid ObjectId, skip
            }
        }
        
        // Parse hireDate string to LocalDate
        if (request.getHireDate() != null && !request.getHireDate().isEmpty()) {
            try {
                employee.setHireDate(LocalDate.parse(request.getHireDate()));
            } catch (Exception e) {
                employee.setHireDate(LocalDate.now());
            }
        } else {
            employee.setHireDate(LocalDate.now());
        }
        
        employee.setEmploymentStatus("Active");
        employee.setEmployeeCode(generateEmployeeCode());
        employee.setCreatedAt(Instant.now());
        employee.setUpdatedAt(Instant.now());
        
        // Handle department - could be ObjectId or department name
        if (request.getDepartmentId() != null && !request.getDepartmentId().isEmpty()) {
            try {
                // Try to parse as ObjectId first
                employee.setDepartmentId(new ObjectId(request.getDepartmentId()));
            } catch (IllegalArgumentException e) {
                // If not a valid ObjectId, try to find department by name
                departmentRepository.findByName(request.getDepartmentId())
                        .ifPresent(dept -> employee.setDepartmentId(dept.getId()));
            }
        }
        
        // Handle manager - could be ObjectId or name (skip if it's a name)
        if (request.getManagerId() != null && !request.getManagerId().isEmpty()) {
            try {
                employee.setManagerEmployeeId(new ObjectId(request.getManagerId()));
            } catch (IllegalArgumentException e) {
                // Manager name provided instead of ID - skip for now
            }
        }
        
        Employee savedEmployee = employeeRepository.save(employee);
        return convertToDTO(savedEmployee);
    }
    
    public EmployeeDTO updateEmployee(ObjectId id, CreateEmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        
        if (request.getFirstName() != null) {
            employee.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            employee.setLastName(request.getLastName());
        }
        if (request.getEmail() != null) {
            employee.setEmail(request.getEmail());
        }
       
        if (request.getJobTitle() != null) {
            employee.setJobTitle(request.getJobTitle());
        }
        if (request.getHireDate() != null && !request.getHireDate().isEmpty()) {
            try {
                employee.setHireDate(LocalDate.parse(request.getHireDate()));
            } catch (Exception e) {
                // Keep existing hireDate if parsing fails
            }
        }
        if (request.getDepartmentId() != null && !request.getDepartmentId().isEmpty()) {
            try {
                employee.setDepartmentId(new ObjectId(request.getDepartmentId()));
            } catch (IllegalArgumentException e) {
                departmentRepository.findByName(request.getDepartmentId())
                        .ifPresent(dept -> employee.setDepartmentId(dept.getId()));
            }
        }
        if (request.getManagerId() != null && !request.getManagerId().isEmpty()) {
            try {
                employee.setManagerEmployeeId(new ObjectId(request.getManagerId()));
            } catch (IllegalArgumentException e) {
                // Skip if not a valid ObjectId
            }
        }
        
        employee.setUpdatedAt(Instant.now());
        Employee updatedEmployee = employeeRepository.save(employee);
        return convertToDTO(updatedEmployee);
    }
    
    public void deleteEmployee(ObjectId id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }
    
    public long countEmployees() {
        return employeeRepository.count();
    }
    
    public long countEmployeesByStatus(String status) {
        return employeeRepository.findByEmploymentStatus(status).size();
    }

    public List<EmployeeDTO> getTeamMembers(String managerId) {
        try {
            ObjectId managerObjectId = new ObjectId(managerId);
            List<Employee> teamMembers = employeeRepository.findByManagerEmployeeId(managerObjectId);
            return teamMembers.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            // Invalid ObjectId format - return empty list
            return List.of();
        }
    }

    public EmployeeDTO assignToTeam(String employeeId, String managerId) {
        ObjectId empObjectId = new ObjectId(employeeId);
        ObjectId managerObjectId = new ObjectId(managerId);
        
        Employee employee = employeeRepository.findById(empObjectId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        
        employee.setManagerEmployeeId(managerObjectId);
        employee.setUpdatedAt(Instant.now());
        Employee updated = employeeRepository.save(employee);
        return convertToDTO(updated);
    }

    public EmployeeDTO removeFromTeam(String employeeId) {
        ObjectId empObjectId = new ObjectId(employeeId);
        
        Employee employee = employeeRepository.findById(empObjectId)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + employeeId));
        
        employee.setManagerEmployeeId(null);
        employee.setUpdatedAt(Instant.now());
        Employee updated = employeeRepository.save(employee);
        return convertToDTO(updated);
    }
    
    private EmployeeDTO convertToDTO(Employee employee) {
        String departmentName = "";
        if (employee.getDepartmentId() != null) {
            departmentName = departmentRepository.findById(employee.getDepartmentId())
                    .map(Department::getName)
                    .orElse("");
        }
        
        String managerName = "";
        if (employee.getManagerEmployeeId() != null) {
            managerName = employeeRepository.findById(employee.getManagerEmployeeId())
                    .map(m -> m.getFirstName() + " " + m.getLastName())
                    .orElse("");
        }
        
        String startDateFormatted = "";
        if (employee.getHireDate() != null) {
            startDateFormatted = employee.getHireDate().format(DATE_FORMATTER);
        }
        
        String fullName = (employee.getFirstName() != null ? employee.getFirstName() : "") + 
                          " " + 
                          (employee.getLastName() != null ? employee.getLastName() : "");
        
        return EmployeeDTO.builder()
                .id(employee.getId() != null ? employee.getId().toHexString() : null)
                .userId(employee.getUserId() != null ? employee.getUserId().toHexString() : null)
                .employeeCode(employee.getEmployeeCode())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .name(fullName.trim())
                .email(employee.getEmail())
               
                .jobTitle(employee.getJobTitle())
                .hireDate(employee.getHireDate())
                .startDate(startDateFormatted)
                .employmentStatus(employee.getEmploymentStatus())
                .status(mapEmploymentStatus(employee.getEmploymentStatus()))
                .departmentId(employee.getDepartmentId() != null ? employee.getDepartmentId().toHexString() : null)
                .departmentName(departmentName)
                .department(departmentName)
                .managerId(employee.getManagerEmployeeId() != null ? employee.getManagerEmployeeId().toHexString() : null)
                .managerName(managerName)
                .manager(managerName)
                .build();
    }
    
    private String mapEmploymentStatus(String employmentStatus) {
        if (employmentStatus == null) {
            return "Active";
        }
        switch (employmentStatus.toLowerCase()) {
            case "active":
                return "Active";
            case "on_leave":
            case "onleave":
            case "on leave":
                return "On Leave";
            case "probation":
                return "Probation";
            case "terminated":
                return "Terminated";
            default:
                return employmentStatus;
        }
    }
    
    private String generateEmployeeCode() {
        long count = employeeRepository.count() + 1;
        return String.format("EMP-%03d", count);
    }
}
