package com.example.service.service.implementation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.service.dto.ProductDTO;
import com.example.service.entity.Product;
import com.example.service.mapper.ProductMapper;
import com.example.service.repository.ProductRepository;
import com.example.service.service.interfaces.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
@Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(productMapper::productToProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::productToProductDTO)
                .orElse(null);
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = productMapper.productDTOToProduct(productDTO);  // Convert DTO to entity
        Product savedProduct = productRepository.save(product);  // Save the entity
        return productMapper.productToProductDTO(savedProduct);  // Convert entity back to DTO and return
    }

    @Override
    public void updateProduct(Long id, ProductDTO productDTO) {
        Product product = productMapper.productDTOToProduct(productDTO);
        product.setProductId(id);
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
