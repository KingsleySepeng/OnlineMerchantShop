package com.example.service.controller;

import com.example.service.model.User;
import com.example.service.service.UserHardcodedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserHardcodedService userService;

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.signup(user.getFirstName(),user.getLastName(),user.getEmail(),user.getPassword());
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        Optional<User> authenticatedUser = userService.login(user.getEmail(),user.getPassword());{
            if(authenticatedUser.isPresent()){
                return authenticatedUser.get();
            }else{
                throw new RuntimeException("Invalid Credentials");
            }
        }
    }

    @GetMapping
    public List<User> getAllUser(){
        return userService.getAllUsers();
    }
}
