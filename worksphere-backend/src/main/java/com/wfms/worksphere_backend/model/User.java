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
@Document(collection = "users")
public class User {
	@Id
	private ObjectId id;
	private String username;
	private String email;
	private String passwordHash;
	private boolean active;
	private ObjectId roleId;
	private Instant createdAt;
	private Instant updatedAt;
}
