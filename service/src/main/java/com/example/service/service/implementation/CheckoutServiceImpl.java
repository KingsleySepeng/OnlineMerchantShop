package com.example.service.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.service.entity.CartItem;
import com.example.service.entity.Product;
import com.example.service.repository.ProductRepository;
import com.example.service.service.interfaces.CheckoutService;

public class CheckoutServiceImpl implements CheckoutService {

    @Autowired
    private ProductRepository productRepository;
    @Override
    public boolean validateCartItems(List<CartItem> cartItems) {
        for(CartItem item:cartItems){
            if(!productRepository.existsById(item.getProduct().getProductId())){
                return false;
            }
            Product product = productRepository.findById(item.getProduct().getProductId()).orElseThrow(()-> new RuntimeException("Product not found"));
            int stock = product.getStock();
            if(item.getQuantity() > stock){
                return false; // not enough stock
            }
        }
        return true;
    }

}
