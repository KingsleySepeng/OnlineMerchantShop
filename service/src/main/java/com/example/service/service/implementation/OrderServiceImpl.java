package com.example.service.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.stereotype.Service;

import com.example.service.dto.OrderDTO;
import com.example.service.entity.Order;
import com.example.service.mapper.OrderMapper;
import com.example.service.repository.OrderRepository;
import com.example.service.service.interfaces.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
@Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderMapper orderMapper;

    @Override
    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::orderToOrderDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(orderMapper::orderToOrderDTO)
                .orElse(null);
    }

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = orderMapper.orderDTOToOrder(orderDTO);  // Convert DTO to entity
        Order savedOrder = orderRepository.save(order);  // Save the entity
        return orderMapper.orderToOrderDTO(savedOrder);  // Convert entity back to DTO and return
    }

    @Override
    public void updateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderMapper.orderDTOToOrder(orderDTO);
        order.setOrderId(id);
        orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
