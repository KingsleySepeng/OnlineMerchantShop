package com.example.service.service.implementation;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.service.entity.Cart;
import com.example.service.entity.CartItem;
import com.example.service.entity.Product;
import com.example.service.entity.User;
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
    private UserRepository userRepository; // Add UserRepository for fetching User

    @Override
    public Cart getCartByUserId(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId); // Fetch User by userId

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return cartRepository.findByUser(user) // Now pass the User object
                    .orElse(null);
        }

        return null; // Handle the case where user is not found
    }

    // @Override
    // @Transactional
    // public Cart syncCart(Long userId, List<CartItem> newItems) {
    //     User user = userRepository.findById(userId)
    //             .orElseThrow(() -> new IllegalArgumentException("User not found"));

    //     Cart cart = cartRepository.findByUser(user).orElseGet(() -> {
    //         Cart newCart = new Cart();
    //         newCart.setUser(user);
    //         return newCart;
    //     });

    //     // Map of product IDs to CartItem for existing items
    //     Map<Long, CartItem> existingItems = cart.getCartItems().stream()
    //             .collect(Collectors.toMap(item -> item.getProduct().getProductId(), item -> item));

    //     // Update or add items based on the provided list
    //     for (CartItem newItem : newItems) {
    //         Product product = productRepository.findById(newItem.getProduct().getProductId())
    //                 .orElseThrow(() -> new IllegalArgumentException("Product not found"));

    //         CartItem item = existingItems.getOrDefault(newItem.getProduct().getProductId(), new CartItem());
    //         item.setCart(cart);
    //         item.setProduct(product);
    //         item.setQuantity(newItem.getQuantity());
    //         cartItemRepository.save(item); // Save or update the item

    //         // Remove processed items from the map to avoid deleting them later
    //         existingItems.remove(newItem.getProduct().getProductId());
    //     }

    //     // Remove items that were not included in the new list
    //     existingItems.values().forEach(cartItemRepository::delete);

    //     // Save the updated cart
    //    return cartRepository.save(cart);
    // }

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
