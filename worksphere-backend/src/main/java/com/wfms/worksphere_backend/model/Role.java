package com.wfms.worksphere_backend.model;

import java.time.Instant;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "roles")
public class Role {
    @Id
    private ObjectId id;
    private String name;
    private String description;
    private List<String> permissions;
    private Instant createdAt;
    private Instant updatedAt;
}
