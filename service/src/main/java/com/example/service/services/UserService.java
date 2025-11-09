package com.example.service.services;

import com.example.service.dtos.UserRequestDto;
import com.example.service.dtos.UserResponseDto;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public UserService() {}

    public UserResponseDto authUser(UserRequestDto userRequestDto) {
        if("king@gmail.com".equals(userRequestDto.email()) && "123".equals(userRequestDto.password())) {
            return new UserResponseDto("1",userRequestDto.email(),userRequestDto.password());
        }
        return null;
//        throw new Exception("User doesnt exist");
    }
}
