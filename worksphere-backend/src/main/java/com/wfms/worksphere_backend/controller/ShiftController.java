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

import com.wfms.worksphere_backend.model.Shift;
import com.wfms.worksphere_backend.service.ShiftService;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {
    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @GetMapping
    public ResponseEntity<List<Shift>> getAll() {
        return ResponseEntity.ok(shiftService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shift> getById(@PathVariable("id") ObjectId id) {
        return ResponseEntity.ok(shiftService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Shift> create(@RequestBody Shift shift) {
        return ResponseEntity.ok(shiftService.create(shift));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shift> update(@PathVariable("id") ObjectId id, @RequestBody Shift shift) {
        return ResponseEntity.ok(shiftService.update(id, shift));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") ObjectId id) {
        shiftService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
