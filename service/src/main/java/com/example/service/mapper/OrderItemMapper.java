package com.example.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.example.service.dto.OrderItemDTO;
import com.example.service.entity.OrderItem;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {
  OrderItemMapper INSTANCE = Mappers.getMapper(OrderItemMapper.class);

    OrderItemDTO orderItemToOrderItemDTO(OrderItem orderItem);
    OrderItem orderItemDTOToOrderItem(OrderItemDTO orderItemDTO);
}
