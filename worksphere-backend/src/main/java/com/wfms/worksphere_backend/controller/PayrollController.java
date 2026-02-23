package com.wfms.worksphere_backend.controller;

import java.util.List;
import java.util.Map;

import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wfms.worksphere_backend.dto.CreatePayrollRequest;
import com.wfms.worksphere_backend.dto.PayrollDTO;
import com.wfms.worksphere_backend.service.PayrollService;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "*")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @GetMapping
    public ResponseEntity<List<PayrollDTO>> getPayroll(
            @RequestParam(required = false) String employeeId,
            @RequestParam(required = false) String status) {
        try {
            List<PayrollDTO> records;

            if (employeeId != null && !employeeId.isEmpty()) {
                try {
                    records = payrollService.getPayrollByEmployee(new ObjectId(employeeId));
                } catch (IllegalArgumentException e) {
                    // Invalid ObjectId format - return empty list
                    records = List.of();
                }
            } else if (status != null && !status.isEmpty()) {
                records = payrollService.getPayrollByStatus(status);
            } else {
                records = payrollService.getAllPayroll();
            }

            return ResponseEntity.ok(records);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PayrollDTO> getPayrollById(@PathVariable String id) {
        try {
            PayrollDTO record = payrollService.getPayrollById(new ObjectId(id));
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<PayrollDTO> createPayroll(@RequestBody CreatePayrollRequest request) {
        try {
            PayrollDTO record = payrollService.createPayroll(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(record);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PayrollDTO> updatePayroll(
            @PathVariable String id,
            @RequestBody CreatePayrollRequest request) {
        try {
            PayrollDTO record = payrollService.updatePayroll(new ObjectId(id), request);
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<PayrollDTO> updatePayrollStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            if (status == null || status.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            PayrollDTO record = payrollService.updatePayrollStatus(new ObjectId(id), status);
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("/{id}/process")
    public ResponseEntity<PayrollDTO> processPayroll(@PathVariable String id) {
        try {
            PayrollDTO record = payrollService.processPayroll(new ObjectId(id));
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayroll(@PathVariable String id) {
        try {
            payrollService.deletePayroll(new ObjectId(id));
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
