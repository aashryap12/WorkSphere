package com.wfms.worksphere_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wfms.worksphere_backend.model.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {
}
