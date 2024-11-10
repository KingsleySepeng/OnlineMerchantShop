package com.example.service.service.interfaces;

import java.util.List;

import com.example.service.entity.CartItem;

public interface CheckoutService {

    boolean validateCartItems(List<CartItem> cartItems);

    
}
