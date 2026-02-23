package com.wfms.worksphere_backend.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.dto.CreatePayrollRequest;
import com.wfms.worksphere_backend.dto.PayrollDTO;
import com.wfms.worksphere_backend.model.Employee;
import com.wfms.worksphere_backend.model.Payroll;
import com.wfms.worksphere_backend.repository.DepartmentRepository;
import com.wfms.worksphere_backend.repository.EmployeeRepository;
import com.wfms.worksphere_backend.repository.PayrollRepository;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepository;
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("MMM dd, yyyy", Locale.ENGLISH);

    public PayrollService(PayrollRepository payrollRepository,
                         EmployeeRepository employeeRepository,
                         DepartmentRepository departmentRepository) {
        this.payrollRepository = payrollRepository;
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    public List<PayrollDTO> getAllPayroll() {
        List<Payroll> records = payrollRepository.findAll();
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PayrollDTO> getPayrollByEmployee(ObjectId employeeId) {
        List<Payroll> records = payrollRepository.findByEmployeeId(employeeId);
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PayrollDTO> getPayrollByStatus(String status) {
        List<Payroll> records = payrollRepository.findByStatus(status);
        return records.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PayrollDTO getPayrollById(ObjectId id) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll record not found with id: " + id));
        return convertToDTO(payroll);
    }

    public PayrollDTO createPayroll(CreatePayrollRequest request) {
        Payroll payroll = new Payroll();

        // Find employee by ID or code
        ObjectId employeeId = findEmployeeId(request.getEmployeeId());
        payroll.setEmployeeId(employeeId);

        // Parse period dates
        if (request.getPeriodStart() != null && !request.getPeriodStart().isEmpty()) {
            try {
                payroll.setPeriodStart(LocalDate.parse(request.getPeriodStart()));
            } catch (Exception e) {
                payroll.setPeriodStart(LocalDate.now().withDayOfMonth(1));
            }
        }

        if (request.getPeriodEnd() != null && !request.getPeriodEnd().isEmpty()) {
            try {
                payroll.setPeriodEnd(LocalDate.parse(request.getPeriodEnd()));
            } catch (Exception e) {
                payroll.setPeriodEnd(LocalDate.now());
            }
        }

        // Parse amounts
        BigDecimal grossPay = parseBigDecimal(request.getGrossPay());
        BigDecimal taxAmount = parseBigDecimal(request.getTaxAmount());
        BigDecimal deductions = parseBigDecimal(request.getDeductions());
        
        payroll.setGrossPay(grossPay);
        payroll.setTaxAmount(taxAmount);
        payroll.setDeductions(deductions);
        
        // Calculate net pay
        BigDecimal netPay = grossPay.subtract(taxAmount).subtract(deductions);
        payroll.setNetPay(netPay);

        payroll.setStatus(request.getStatus() != null ? request.getStatus() : "Pending");
        payroll.setCreatedAt(Instant.now());
        payroll.setUpdatedAt(Instant.now());

        Payroll savedPayroll = payrollRepository.save(payroll);
        return convertToDTO(savedPayroll);
    }

    public PayrollDTO updatePayrollStatus(ObjectId id, String status) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll record not found with id: " + id));
        
        payroll.setStatus(status);
        payroll.setUpdatedAt(Instant.now());
        
        if ("Paid".equals(status)) {
            payroll.setPaidAt(Instant.now());
        }
        
        Payroll savedPayroll = payrollRepository.save(payroll);
        return convertToDTO(savedPayroll);
    }

    public PayrollDTO processPayroll(ObjectId id) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll record not found with id: " + id));
        
        if (!"Pending".equals(payroll.getStatus()) && !"Processing".equals(payroll.getStatus())) {
            throw new RuntimeException("Only pending or processing payroll can be processed");
        }
        
        payroll.setStatus("Paid");
        payroll.setPaidAt(Instant.now());
        payroll.setUpdatedAt(Instant.now());
        
        Payroll savedPayroll = payrollRepository.save(payroll);
        return convertToDTO(savedPayroll);
    }

    public PayrollDTO updatePayroll(ObjectId id, CreatePayrollRequest request) {
        Payroll payroll = payrollRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payroll record not found with id: " + id));

        if (request.getPeriodStart() != null && !request.getPeriodStart().isEmpty()) {
            try {
                payroll.setPeriodStart(LocalDate.parse(request.getPeriodStart()));
            } catch (Exception e) {
                // Keep existing date
            }
        }

        if (request.getPeriodEnd() != null && !request.getPeriodEnd().isEmpty()) {
            try {
                payroll.setPeriodEnd(LocalDate.parse(request.getPeriodEnd()));
            } catch (Exception e) {
                // Keep existing date
            }
        }

        if (request.getGrossPay() != null && !request.getGrossPay().isEmpty()) {
            BigDecimal grossPay = parseBigDecimal(request.getGrossPay());
            payroll.setGrossPay(grossPay);
        }

        if (request.getTaxAmount() != null && !request.getTaxAmount().isEmpty()) {
            BigDecimal taxAmount = parseBigDecimal(request.getTaxAmount());
            payroll.setTaxAmount(taxAmount);
        }

        if (request.getDeductions() != null && !request.getDeductions().isEmpty()) {
            BigDecimal deductions = parseBigDecimal(request.getDeductions());
            payroll.setDeductions(deductions);
        }

        // Recalculate net pay
        BigDecimal netPay = payroll.getGrossPay()
                .subtract(payroll.getTaxAmount() != null ? payroll.getTaxAmount() : BigDecimal.ZERO)
                .subtract(payroll.getDeductions() != null ? payroll.getDeductions() : BigDecimal.ZERO);
        payroll.setNetPay(netPay);

        if (request.getStatus() != null) {
            payroll.setStatus(request.getStatus());
        }

        payroll.setUpdatedAt(Instant.now());

        Payroll savedPayroll = payrollRepository.save(payroll);
        return convertToDTO(savedPayroll);
    }

    public void deletePayroll(ObjectId id) {
        if (!payrollRepository.existsById(id)) {
            throw new RuntimeException("Payroll record not found with id: " + id);
        }
        payrollRepository.deleteById(id);
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

    private BigDecimal parseBigDecimal(String value) {
        if (value == null || value.isEmpty()) {
            return BigDecimal.ZERO;
        }
        try {
            return new BigDecimal(value);
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO;
        }
    }

    private PayrollDTO convertToDTO(Payroll payroll) {
        PayrollDTO dto = new PayrollDTO();
        
        if (payroll.getId() != null) {
            dto.setId(payroll.getId().toHexString());
        }
        
        if (payroll.getEmployeeId() != null) {
            dto.setEmployeeId(payroll.getEmployeeId().toHexString());
            
            // Fetch employee details
            employeeRepository.findById(payroll.getEmployeeId()).ifPresent(employee -> {
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

        if (payroll.getPeriodStart() != null) {
            dto.setPeriodStart(payroll.getPeriodStart().format(DATE_FORMATTER));
            dto.setPayPeriodStart(payroll.getPeriodStart().toString());
        }

        if (payroll.getPeriodEnd() != null) {
            dto.setPeriodEnd(payroll.getPeriodEnd().format(DATE_FORMATTER));
            dto.setPayPeriodEnd(payroll.getPeriodEnd().toString());
            // Use period end as pay date (or paidAt if available)
            dto.setPayDate(payroll.getPeriodEnd().toString());
        }

        dto.setGrossPay(payroll.getGrossPay());
        dto.setGrossSalary(payroll.getGrossPay()); // Alias for frontend
        dto.setNetPay(payroll.getNetPay());
        dto.setTaxAmount(payroll.getTaxAmount());
        dto.setDeductions(payroll.getDeductions());
        dto.setStatus(payroll.getStatus());
        dto.setPaidAt(payroll.getPaidAt());

        return dto;
    }
}
