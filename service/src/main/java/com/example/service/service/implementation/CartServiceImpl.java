package com.example.service.service.implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.service.dto.CartDTO;
import com.example.service.entity.Cart;
import com.example.service.entity.CartItem;
import com.example.service.entity.Product;
import com.example.service.entity.User;
import com.example.service.mapper.CartMapper;
import com.example.service.repository.CartItemRepository;
import com.example.service.repository.CartRepository;
import com.example.service.repository.ProductRepository;
import com.example.service.repository.UserRepository;
import com.example.service.service.interfaces.CartService;

@Service
public class CartServiceImpl implements CartService {
 @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;  // Add UserRepository for fetching User

    @Autowired
    private CartMapper cartMapper;

    @Override
    public CartDTO getCartByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);  // Fetch User by userId

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return cartRepository.findByUser(user)  // Now pass the User object
                    .map(cartMapper::cartToCartDTO)
                    .orElse(null);
        }

        return null;  // Handle the case where user is not found
    }

    @Override
    public void addItemToCart(Long userId, Long productId, int quantity) {
        Optional<User> userOptional = userRepository.findById(userId);  // Fetch User by userId

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Cart cart = cartRepository.findByUser(user).orElse(new Cart());
            Optional<Product> productOptional = productRepository.findById(productId);

            if (productOptional.isPresent()) {
                Product product = productOptional.get();
                CartItem cartItem = new CartItem();
                cartItem.setCart(cart);
                cartItem.setProduct(product);
                cartItem.setQuantity(quantity);
                cartItemRepository.save(cartItem);
            }
        }
    }

    @Override
    public void removeItemFromCart(Long userId, Long productId) {
        Optional<User> userOptional = userRepository.findById(userId);  // Fetch User by userId

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Cart cart = cartRepository.findByUser(user).orElse(null);
            if (cart != null) {
                cartItemRepository.findByCart(cart)
                        .stream()
                        .filter(cartItem -> cartItem.getProduct().getProductId().equals(productId))
                        .forEach(cartItemRepository::delete);
            }
        }
    }

    @Override
    public void clearCart(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);  // Fetch User by userId

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            Cart cart = cartRepository.findByUser(user).orElse(null);
            if (cart != null) {
                cartItemRepository.findByCart(cart).forEach(cartItemRepository::delete);
            }
        }
    }
}
