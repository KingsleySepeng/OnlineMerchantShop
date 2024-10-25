package com.example.service.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.example.service.entity.User;

public interface UserService {
 List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User User);
    void updateUser(Long id, User User);
    void deleteUser(Long id);
    Optional<User> login(String email, String password);
}
