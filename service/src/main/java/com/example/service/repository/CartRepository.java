package com.example.service.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.service.entity.Cart;
import com.example.service.entity.User;

public interface CartRepository extends JpaRepository<Cart,Long> {
Optional<Cart> findByUser(User user);
}
