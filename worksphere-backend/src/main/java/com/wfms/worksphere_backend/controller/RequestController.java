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

import com.wfms.worksphere_backend.model.Request;
import com.wfms.worksphere_backend.service.RequestService;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAll() {
        return ResponseEntity.ok(requestService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getById(@PathVariable("id") ObjectId id) {
        return ResponseEntity.ok(requestService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Request> create(@RequestBody Request request) {
        return ResponseEntity.ok(requestService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> update(@PathVariable("id") ObjectId id, @RequestBody Request request) {
        return ResponseEntity.ok(requestService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") ObjectId id) {
        requestService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
