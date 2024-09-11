package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.service.entity.Order;
import com.example.service.entity.User;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order,Long> {
List<Order> findByUser(User user);
}
