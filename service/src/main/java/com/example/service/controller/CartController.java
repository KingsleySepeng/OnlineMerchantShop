package com.example.service.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.entity.Cart;
import com.example.service.service.interfaces.CartService;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCartByUserId(@PathVariable Long userId) {
        Cart cart = cartService.getCartByUserId(userId);
        logger.info("CART_CONTROLLER -- GET CART: {}",cart);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/{userId}/items/{productId}")
    public ResponseEntity<Void> addItemToCart(@PathVariable Long userId, @PathVariable Long productId, @RequestParam int quantity) {
        cartService.addItemToCart(userId, productId, quantity);
        logger.info("CART_CONTROLLER -- ADDING ITEM TO CART: {}",userId,productId,quantity);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{userId}/items/{productId}")
    public ResponseEntity<Void> removeItemFromCart(@PathVariable Long userId, @PathVariable Long productId) {
        cartService.removeItemFromCart(userId, productId);
        logger.info("CART_CONTROLLER -- REMOVING ITEM FROM CART: {} ", userId,productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        logger.info("CART_CONTROLLER -- CLEARING CART: {}", userId);
        return ResponseEntity.noContent().build();
    }
}
