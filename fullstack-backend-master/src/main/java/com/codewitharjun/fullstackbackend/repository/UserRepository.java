package com.codewitharjun.fullstackbackend.repository;

import com.codewitharjun.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Add this method to find a user by email
    Optional<User> findByEmail(String email);
}
