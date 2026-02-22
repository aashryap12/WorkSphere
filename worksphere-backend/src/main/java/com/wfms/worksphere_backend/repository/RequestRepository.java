package com.wfms.worksphere_backend.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.wfms.worksphere_backend.model.Request;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    List<Request> findByUserId(ObjectId userId);
    List<Request> findByStatus(String status);
    List<Request> findByUserIdAndStatus(ObjectId userId, String status);
}
