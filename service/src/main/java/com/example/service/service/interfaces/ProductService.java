package com.example.service.service.interfaces;

import java.util.List;

import com.example.service.dto.ProductDTO;

public interface ProductService {
 List<ProductDTO> getAllProducts();
    ProductDTO getProductById(Long id);
    ProductDTO createProduct(ProductDTO productDTO);
    void updateProduct(Long id, ProductDTO productDTO);
    void deleteProduct(Long id);
}
