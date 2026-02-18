package com.wfms.worksphere_backend.model;

import java.time.Instant;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "departments")
public class Department {
	@Id
	private ObjectId id;
	private String name;
	private String code;
	private ObjectId managerEmployeeId;
	private String description;
	private boolean active;
	private Instant createdAt;
	private Instant updatedAt;
}
