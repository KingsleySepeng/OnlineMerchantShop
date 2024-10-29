package com.example.service.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.service.entity.User;
import com.example.service.entity.User.Role;
import com.example.service.repository.UserRepository;
import com.example.service.service.interfaces.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll().stream().collect(Collectors.toList());
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User createUser(User user) {
        String username = user.getFirstName() + user.getLastName();
        
        user.setUsername(username);
        user.setRole(Role.CUSTOMER); 
        return userRepository.save(user);  // Save the user and get the saved entity
       
    }

    @Override
    public void updateUser(Long id, User user) {
        user.setUserId(id);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

     // Login method using email and password
     @Override
     public Optional<User> login(String email, String password) {
         // Fetch user by email
         Optional<User> userOptional = userRepository.findByEmail(email);
         
         if (userOptional.isPresent()) {
             User user = userOptional.get();
             
             // Check if the password matches
             if (user.getPassword().equals(password)) {
                 return Optional.of(user);  // Return UserDTO if successful
             }
         }
         
         return Optional.empty();  // Return empty if login fails
     }
}
