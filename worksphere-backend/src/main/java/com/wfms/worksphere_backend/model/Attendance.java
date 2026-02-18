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
@Document(collection = "attendance")
public class Attendance {
	@Id
	private ObjectId id;
	private ObjectId employeeId;
	private ObjectId shiftId;
	private LocalDate workDate;
	private Instant checkInAt;
	private Instant checkOutAt;
	private String status;
	private String notes;
	private Instant createdAt;
	private Instant updatedAt;
}
