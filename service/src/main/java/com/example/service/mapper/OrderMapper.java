package com.example.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import com.example.service.entity.Order;
import com.example.service.dto.OrderDTO;

@Mapper(componentModel = "spring")
public interface OrderMapper {
OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    OrderDTO orderToOrderDTO(Order order);
    Order orderDTOToOrder(OrderDTO orderDTO);
}
