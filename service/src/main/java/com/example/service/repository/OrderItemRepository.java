package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.service.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {

}
