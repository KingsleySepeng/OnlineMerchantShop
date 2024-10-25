package com.example.service.service.interfaces;

import java.util.List;

import com.example.service.entity.Product;

public interface ProductService {
 List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProduct(Product product);
    void updateProduct(Long id, Product product);
    void deleteProduct(Long id);
}
