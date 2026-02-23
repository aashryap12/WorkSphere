package com.wfms.worksphere_backend.model;

import java.time.Instant;
import java.time.LocalDate;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "employees")
public class Employee {
	@Id
	private ObjectId id;
	private ObjectId userId;
	private ObjectId departmentId;
	private String employeeCode;
	private String firstName;
	private String lastName;
	private String email;
	private String jobTitle;
	private LocalDate hireDate;
	private String employmentStatus;
	private ObjectId managerEmployeeId;
	private Instant createdAt;
	private Instant updatedAt;
}
