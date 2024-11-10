package com.example.service.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.entity.Order;
import com.example.service.entity.OrderItem;
import com.example.service.entity.Product;
import com.example.service.repository.OrderItemRepository;
import com.example.service.repository.OrderRepository;
import com.example.service.repository.ProductRepository;
import com.example.service.service.interfaces.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;  
    
    @Autowired
    private OrderItemRepository orderItemRepository;

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

    @Transactional
    public Order processOrder(Order order) throws Exception{
         for (OrderItem item : order.getOrderItems()) {
            Product product = productRepository.findById(item.getProduct().getProductId())
                .orElseThrow(() -> new Exception("Product not found: " + item.getProduct().getProductId()));
            
            if (item.getQuantity() > product.getStock()) {
                throw new Exception("Not enough stock for product: " + product.getName());
            }

            // Update stock
            int newStock = product.getStock() - item.getQuantity();
            product.setStock(newStock);
            productRepository.save(product);

            // Create order item
            item.setOrder(order);
            orderItemRepository.save(item);
        }

        // Save the order
        return orderRepository.save(order);
    }
    }
