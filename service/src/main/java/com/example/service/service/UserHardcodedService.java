package com.example.service.service;

import com.example.service.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserHardcodedService {

    private final static List<User> users = new ArrayList<>();
    private static Long userIdCounter=0L;
//    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    static{
        users.add(new User(++userIdCounter,"Kingsley","Sepeng","king.sep@gmail.com","1234"));
        users.add(new User(++userIdCounter,"Kingsley1","Sepeng1","king1.sep@gmail.com","1234"));
        users.add(new User(++userIdCounter,"Kingsley2","Sepeng2","king2.sep@gmail.com","12345"));
        users.add(new User(++userIdCounter,"Kingsley3","Sepeng3","king3.sep@gmail.com","12346"));
    }
    public User signup(String firstName,String lastName,String email,String password){
        User user = new User(++userIdCounter,firstName,lastName,email,password);
        users.add(user);
        return user;
    }

    public Optional<User> login(String email,String password){
        return users.stream()
                .filter(user->user.getEmail().equals(email)&&user.getPassword().equals(password))
                .findFirst();
    }
    public List<User> getAllUsers(){
        return users;
    }
}
