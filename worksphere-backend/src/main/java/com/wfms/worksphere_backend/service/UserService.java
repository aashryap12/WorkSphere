package com.wfms.worksphere_backend.service;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.wfms.worksphere_backend.model.User;

@Service
public class UserService {
    public List<User> getAll() {
        throw new UnsupportedOperationException("Not implemented");
    }

    public User getById(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public User create(User user) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public User update(ObjectId id, User user) {
        throw new UnsupportedOperationException("Not implemented");
    }

    public void delete(ObjectId id) {
        throw new UnsupportedOperationException("Not implemented");
    }
}
