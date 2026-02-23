package com.codewitharjun.fullstackbackend.controller;

import com.codewitharjun.fullstackbackend.exception.UserNotFoundException;
import com.codewitharjun.fullstackbackend.model.LoginRequest;
import com.codewitharjun.fullstackbackend.model.User;
import com.codewitharjun.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // CREATE USER
    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    // GET ALL USERS
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET USER BY ID
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // UPDATE USER
    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFullName(newUser.getFullName());
                    user.setEmail(newUser.getEmail());
                    user.setPassword(newUser.getPassword());
                    user.setGender(newUser.getGender());
                    user.setMobileNumber(newUser.getMobileNumber());
                    user.setDateOfBirth(newUser.getDateOfBirth());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // DELETE USER
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User with id " + id + " has been deleted successfully.";
    }
    
 
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {

        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(
                );

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid password"
            );
        }

        user.setPassword(null); // IMPORTANT
        return ResponseEntity.ok(user);
    }


}

