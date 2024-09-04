package com.example.service.controller;

import com.example.service.model.User;
import com.example.service.service.UserHardcodedService;

import org.apache.catalina.connector.Response;
import org.apache.commons.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserHardcodedService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserHardcodedService userService){
        this.userService = userService;

    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        User createdUser= userService.signup(user.getFirstName(),user.getLastName(),user.getEmail(),user.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Optional<User> authenticatedUser = userService.login(user.getEmail(),user.getPassword());{
                if(authenticatedUser.isPresent()){
                    return ResponseEntity.ok(authenticatedUser.get());
                }else{
                    logger.warn("INVALID CREDENTIALS FOR EMAIL: {}",user.getEmail());
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("INVALID CREDENTIALS");
                }
            }
            
        } catch (Exception e) {
            logger.error("INVALID CREDENTIALS FOR EMAIL: {}",user.getEmail(),e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR OCCURED DURING LOGIN");
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUser(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
