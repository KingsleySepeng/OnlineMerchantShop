package com.example.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.service.dto.ProductDTO;
import com.example.service.entity.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
 ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductDTO productToProductDTO(Product product);
    
    Product productDTOToProduct(ProductDTO productDTO);
}
