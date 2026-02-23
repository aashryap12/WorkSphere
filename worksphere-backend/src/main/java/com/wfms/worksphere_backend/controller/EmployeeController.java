package com.wfms.worksphere_backend.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wfms.worksphere_backend.dto.CreateEmployeeRequest;
import com.wfms.worksphere_backend.dto.EmployeeDTO;
import com.wfms.worksphere_backend.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {
    
    private final EmployeeService employeeService;
    
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable("id") String id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(new ObjectId(id)));
    }
    
    @GetMapping("/code/{code}")
    public ResponseEntity<EmployeeDTO> getEmployeeByCode(@PathVariable("code") String code) {
        return ResponseEntity.ok(employeeService.getEmployeeByCode(code));
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByDepartment(@PathVariable("departmentId") String departmentId) {
        return ResponseEntity.ok(employeeService.getEmployeesByDepartment(new ObjectId(departmentId)));
    }
    
    @GetMapping("/status")
    public ResponseEntity<List<EmployeeDTO>> getEmployeesByStatus(@RequestParam("status") String status) {
        return ResponseEntity.ok(employeeService.getEmployeesByStatus(status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<EmployeeDTO> getEmployeeByUserId(@PathVariable("userId") String userId) {
        try {
            EmployeeDTO employee = employeeService.getEmployeeByUserId(new ObjectId(userId));
            if (employee == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(employee);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<EmployeeDTO> getEmployeeByEmail(@PathVariable("email") String email) {
        try {
            EmployeeDTO employee = employeeService.getEmployeeByEmail(email);
            if (employee == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(employee);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/count")
    public ResponseEntity<Long> countEmployees() {
        return ResponseEntity.ok(employeeService.countEmployees());
    }
    
    @GetMapping("/count/status")
    public ResponseEntity<Long> countEmployeesByStatus(@RequestParam("status") String status) {
        return ResponseEntity.ok(employeeService.countEmployeesByStatus(status));
    }
    
    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@RequestBody CreateEmployeeRequest request) {
        return ResponseEntity.ok(employeeService.createEmployee(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(
            @PathVariable("id") String id,
            @RequestBody CreateEmployeeRequest request) {
        return ResponseEntity.ok(employeeService.updateEmployee(new ObjectId(id), request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("id") String id) {
        employeeService.deleteEmployee(new ObjectId(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/team/{managerEmployeeId}")
    public ResponseEntity<List<EmployeeDTO>> getTeamMembers(@PathVariable("managerEmployeeId") String managerEmployeeId) {
        try {
            return ResponseEntity.ok(employeeService.getTeamMembers(managerEmployeeId));
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }

    @PutMapping("/{employeeId}/assign-team/{managerEmployeeId}")
    public ResponseEntity<EmployeeDTO> assignToTeam(
            @PathVariable("employeeId") String employeeId,
            @PathVariable("managerEmployeeId") String managerEmployeeId) {
        try {
            return ResponseEntity.ok(employeeService.assignToTeam(employeeId, managerEmployeeId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{employeeId}/remove-from-team")
    public ResponseEntity<EmployeeDTO> removeFromTeam(@PathVariable("employeeId") String employeeId) {
        try {
            return ResponseEntity.ok(employeeService.removeFromTeam(employeeId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
