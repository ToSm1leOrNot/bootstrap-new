package com.example.demo.service;

import com.example.demo.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUser();

    User findById (long id);

    void addUser(User newUser);

    void deleteUser(long id);

    void updateUser(long id, User userForUpdate);

    User findByUsername(String username);
}
