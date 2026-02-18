package com.wfms.worksphere_backend.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wfms.worksphere_backend.model.Payroll;
import com.wfms.worksphere_backend.service.PayrollService;

@RestController
@RequestMapping("/api/payrolls")
public class PayrollController {
    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @GetMapping
    public ResponseEntity<List<Payroll>> getAll() {
        return ResponseEntity.ok(payrollService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payroll> getById(@PathVariable("id") ObjectId id) {
        return ResponseEntity.ok(payrollService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Payroll> create(@RequestBody Payroll payroll) {
        return ResponseEntity.ok(payrollService.create(payroll));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payroll> update(@PathVariable("id") ObjectId id, @RequestBody Payroll payroll) {
        return ResponseEntity.ok(payrollService.update(id, payroll));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") ObjectId id) {
        payrollService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
