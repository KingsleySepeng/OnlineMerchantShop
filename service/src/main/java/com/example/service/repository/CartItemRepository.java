package com.example.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.service.entity.Cart;
import com.example.service.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
List<CartItem> findByCart(Cart cart);
}
