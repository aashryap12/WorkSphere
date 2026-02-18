package com.wfms.worksphere_backend.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.wfms.worksphere_backend.model.Request;

public interface RequestRepository extends MongoRepository<Request, ObjectId> {
}
