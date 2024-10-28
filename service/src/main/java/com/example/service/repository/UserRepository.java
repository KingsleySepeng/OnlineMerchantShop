package com.example.service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.service.entity.User;

public interface UserRepository extends JpaRepository<User,Long> {
Optional<User> findByUsername(String user);
Optional<User> findByEmail(String email);  // Finds user by email

}
