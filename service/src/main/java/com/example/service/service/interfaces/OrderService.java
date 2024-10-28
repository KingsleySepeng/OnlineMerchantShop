package com.example.service.service.interfaces;

import java.util.List;

import com.example.service.entity.Order;

public interface OrderService {
List<Order> getAllOrders();
    Order getOrderById(Long id);
    Order createOrder(Order order);
    void updateOrder(Long id, Order order);
    void deleteOrder(Long id);
}
