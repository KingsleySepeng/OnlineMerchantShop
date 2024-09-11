package com.example.service.service.interfaces;

import com.example.service.dto.CartDTO;

public interface CartService {
 CartDTO getCartByUserId(Long userId);
    void addItemToCart(Long userId, Long productId, int quantity);
    void removeItemFromCart(Long userId, Long productId);
    void clearCart(Long userId);
}
