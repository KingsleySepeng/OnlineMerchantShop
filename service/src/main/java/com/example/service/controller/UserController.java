package com.example.service.controller;

import com.example.service.entity.User;
import com.example.service.service.interfaces.UserService;

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

   private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user) {
        logger.info("USER_CONTROLLER -- ATTEMPTING TO CREATE USER: {}", user.getEmail());
        User createdUser = userService.createUser(user);
        logger.info("USER_CONTROLLER -- CREATED USER: {}", createdUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Optional<User> authenticatedUser = userService.login(user.getEmail(), user.getPassword());
            if (authenticatedUser.isPresent()) {
                return ResponseEntity.ok(authenticatedUser.get());
            } else {
                logger.warn("USER_CONTROLLER -- INVALID CREDENTIALS FOR EMAIL: {}", user.getEmail());
                logger.info("USER_CONTROLLER -- INVALID CREDENTIALS FOR EMAIL: {}", user.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("INVALID CREDENTIALS");
            }
        } catch (Exception e) {
            logger.error("USER_CONTROLLER --ERROR OCCURRED DURING LOGIN FOR EMAIL: {}", user.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR OCCURRED DURING LOGIN");
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        logger.info("USER_CONTROLLER -- GETTING ALL USERS");
        return ResponseEntity.ok(users);
    }
}
