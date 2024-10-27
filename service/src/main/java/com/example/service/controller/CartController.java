package com.example.service.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.entity.Cart;
import com.example.service.entity.CartItem;
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

    // @PatchMapping("/{userId}")
    // public ResponseEntity<Cart> syncCart(@PathVariable Long userId,@RequestBody List<CartItem> cartItems){
    //     try {
    //     // Assuming you have a method to convert CartItemDto to CartItem
    //     Cart cart = cartService.syncCart(userId, cartItems);
    //     logger.info("CART_CONTROLLER -- SYNCING CART FOR USER: {}", userId);
    //     return ResponseEntity.ok(cart);
    // } catch (Exception e) {
    //     logger.error("Error syncing cart for user {}: {}", userId, e.getMessage());
    //     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    // }
    // }

    @PutMapping("/{userId}/items/{productId}")
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
