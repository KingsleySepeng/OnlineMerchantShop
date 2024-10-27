package com.example.service.service.interfaces;

import com.example.service.entity.Cart;

public interface CartService {
 Cart getCartByUserId(Long userId);
//  Cart syncCart(Long userId, List<CartItem> newItems);


 // replacing these 3 methods with syncCart PATCH request
    void addItemToCart(Long userId, Long productId, int quantity);
    void removeItemFromCart(Long userId, Long productId);
    void clearCart(Long userId);
}
