package com.example.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.service.dto.CartItemDTO;
import com.example.service.entity.CartItem;

@Mapper(componentModel = "spring")
public interface CartItemMapper {
 CartItemMapper INSTANCE = Mappers.getMapper(CartItemMapper.class);

    CartItemDTO cartItemToCartItemDTO(CartItem cartItem);
    CartItem cartItemDTOToCartItem(CartItemDTO cartItemDTO);
}
