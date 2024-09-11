package com.example.service.dto;

import java.util.List;

public class CartDTO {
    private Long cartId;
    private Long userId;  // You can link to a UserDTO if needed
    private List<CartItemDTO> cartItems;  // List of CartItems

    // Getters and Setters
    public Long getCartId() {
        return cartId;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<CartItemDTO> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItemDTO> cartItems) {
        this.cartItems = cartItems;
    }
}
