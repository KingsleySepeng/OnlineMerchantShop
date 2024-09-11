package com.example.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.example.service.dto.UserDTO;
import com.example.service.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserDTO userToUserDTO(User user);
    User userDTOToUser(UserDTO userDTO);
}
