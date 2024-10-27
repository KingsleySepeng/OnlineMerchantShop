package com.example.service.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.service.entity.Order;
import com.example.service.repository.OrderRepository;
import com.example.service.service.interfaces.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
@Autowired
    private OrderRepository orderRepository;

 

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll().stream() .collect(Collectors.toList());
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        return orderRepository.save(order);  // Save the entity
    }

    @Override
    public void updateOrder(Long id, Order order) {
        order.setOrderId(id);
        orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
