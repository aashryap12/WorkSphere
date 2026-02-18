package com.wfms.worksphere_backend.model;

import java.time.Instant;
import java.time.LocalTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "shifts")
public class Shift {
	@Id
	private ObjectId id;
	private String name;
	private LocalTime startTime;
	private LocalTime endTime;
	private String timeZone;
	private int breakMinutes;
	private boolean active;
	private Instant createdAt;
	private Instant updatedAt;
}
