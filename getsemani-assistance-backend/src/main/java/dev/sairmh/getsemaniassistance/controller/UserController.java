package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.User;
import dev.sairmh.getsemaniassistance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api_old/user")
public class UserController {
//    @Autowired
//    private UserService userService;
//
//    @PostMapping
//    public ResponseEntity<User> create(@RequestBody User user){
//        return new ResponseEntity<>(userService.create(user), HttpStatus.CREATED);
//    }

}
