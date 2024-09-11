package com.example.service.service.interfaces;

import java.util.List;

import com.example.service.dto.OrderDTO;

public interface OrderService {
List<OrderDTO> getAllOrders();
    OrderDTO getOrderById(Long id);
    OrderDTO createOrder(OrderDTO orderDTO);
    void updateOrder(Long id, OrderDTO orderDTO);
    void deleteOrder(Long id);
}
