package com.example.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.example.service.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
}
