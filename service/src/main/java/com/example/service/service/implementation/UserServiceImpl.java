package com.example.service.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.service.dto.UserDTO;
import com.example.service.entity.User;
import com.example.service.mapper.UserMapper;
import com.example.service.repository.UserRepository;
import com.example.service.service.interfaces.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::userToUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::userToUserDTO)
                .orElse(null);
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = userMapper.userDTOToUser(userDTO);  // Convert DTO to entity
        User savedUser = userRepository.save(user);  // Save the user and get the saved entity
        return userMapper.userToUserDTO(savedUser);
    }

    @Override
    public void updateUser(Long id, UserDTO userDTO) {
        User user = userMapper.userDTOToUser(userDTO);
        user.setUserId(id);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

     // Login method using email and password
     @Override
     public Optional<UserDTO> login(String email, String password) {
         // Fetch user by email
         Optional<User> userOptional = userRepository.findByEmail(email);
         
         if (userOptional.isPresent()) {
             User user = userOptional.get();
             
             // Check if the password matches
             if (user.getPassword().equals(password)) {
                 return Optional.of(userMapper.userToUserDTO(user));  // Return UserDTO if successful
             }
         }
         
         return Optional.empty();  // Return empty if login fails
     }
}
