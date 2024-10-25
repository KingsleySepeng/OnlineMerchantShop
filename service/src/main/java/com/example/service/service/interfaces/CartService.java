package com.example.service.service.interfaces;

import com.example.service.entity.Cart;

public interface CartService {
 Cart getCartByUserId(Long userId);
    void addItemToCart(Long userId, Long productId, int quantity);
    void removeItemFromCart(Long userId, Long productId);
    void clearCart(Long userId);
}
