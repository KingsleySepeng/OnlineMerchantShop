package com.example.service.controllers;

import com.example.service.dtos.UserRequestDto;
import com.example.service.dtos.UserResponseDto;
import com.example.service.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserResponseDto login(@RequestBody UserRequestDto userRequestDto) {
        return userService.authUser(userRequestDto);
    }
}
