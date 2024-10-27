package com.example.service.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.entity.Order;
import com.example.service.service.interfaces.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
 private final OrderService orderService;
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) { // TODO: CREATE ORDER ONLY AFTER CHECKOUT.
        Order createdOrder = orderService.createOrder(order);
        logger.info("ORDER_CONTROLLER -- CREATED ORDER: {}", createdOrder);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) { // TODO: GET ORDERS BY USER ID.
        Order order = orderService.getOrderById(id);
        logger.info("ORDER_CONTROLLER -- GET ORDER BY ID : {}", order);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        logger.info("ORDER_CONTROLLER -- GET ALL ORDERS: {}",orders);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        orderService.updateOrder(id, order);
        logger.info("ORDER_CONTROLLER -- UPDATE ORDER BY ID : {}",order);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
       orderService.deleteOrder(id);
        logger.info("ORDER_CONTROLLER -- DELETEING ORDER BY ID: {}", id);
        return ResponseEntity.noContent().build();
    }
}
