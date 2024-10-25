package com.example.service.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.Order;
import org.springframework.stereotype.Service;

import com.example.service.entity.Order;
import com.example.service.repository.OrderRepository;
import com.example.service.service.interfaces.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
@Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::orderToOrder)
                .collect(Collectors.toList());
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(orderMapper::orderToOrder)
                .orElse(null);
    }

    @Override
    public Order createOrder(Order order) {
        Order order = orderMapper.orderToOrder(order);  // Convert DTO to entity
        Order savedOrder = orderRepository.save(order);  // Save the entity
        return orderMapper.orderToOrder(savedOrder);  // Convert entity back to DTO and return
    }

    @Override
    public void updateOrder(Long id, Order order) {
        Order order = orderMapper.orderToOrder(order);
        order.setOrderId(id);
        orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
