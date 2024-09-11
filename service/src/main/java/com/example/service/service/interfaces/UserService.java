package com.example.service.service.interfaces;

import java.util.List;
import java.util.Optional;

import com.example.service.dto.UserDTO;

public interface UserService {
 List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    UserDTO createUser(UserDTO userDTO);
    void updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);
    Optional<UserDTO> login(String email, String password);
}
