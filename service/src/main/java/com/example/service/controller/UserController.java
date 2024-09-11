package com.example.service.controller;

import com.example.service.dto.UserDTO;
import com.example.service.service.interfaces.UserService;

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

   private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            Optional<UserDTO> authenticatedUser = userService.login(userDTO.getEmail(), userDTO.getPassword());
            if (authenticatedUser.isPresent()) {
                return ResponseEntity.ok(authenticatedUser.get());
            } else {
                logger.warn("INVALID CREDENTIALS FOR EMAIL: {}", userDTO.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("INVALID CREDENTIALS");
            }
        } catch (Exception e) {
            logger.error("ERROR OCCURRED DURING LOGIN FOR EMAIL: {}", userDTO.getEmail(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("ERROR OCCURRED DURING LOGIN");
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
