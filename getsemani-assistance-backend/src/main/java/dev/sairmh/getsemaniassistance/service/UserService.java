package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.User;
import dev.sairmh.getsemaniassistance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getById(String id){
        return userRepository.findById(id).orElse(null);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

    public User create(User user){
        return userRepository.save(user);
    }

}
