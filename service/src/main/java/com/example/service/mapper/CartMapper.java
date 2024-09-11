package com.example.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.service.dto.CartDTO;
import com.example.service.entity.Cart;

@Mapper(componentModel = "spring")
public interface CartMapper {
CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    CartDTO cartToCartDTO(Cart cart);
    Cart cartDTOToCart(CartDTO cartDTO);
}
