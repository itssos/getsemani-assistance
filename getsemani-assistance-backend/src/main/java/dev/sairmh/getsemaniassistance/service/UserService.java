package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.exception.StudentNotFoundException;
import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.model.Student;
import dev.sairmh.getsemaniassistance.model.User;
import dev.sairmh.getsemaniassistance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        user.setPassword(user.getId());
        return userRepository.save(user);
    }
    public void deleteUser(String id){
        userRepository.deleteById(id);
    }
    public User update(User user){
        Optional<User> existingUserOptional = userRepository.findById(user.getId());
        if(existingUserOptional.isPresent()){
            User existingUser = existingUserOptional.get();
            existingUser.setName(user.getName());
            existingUser.setSurname(user.getSurname());
            return userRepository.save(user);
        }
        return null;
    }
}
