package com.example.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HelloController {
@GetMapping("/hello")
    public ResponseEntity<String> hello(@RequestBody String name){
     return ResponseEntity.ok("Hello " + name);
    }
}
