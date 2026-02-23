package com.codewitharjun.fullstackbackend.repository;

import com.codewitharjun.fullstackbackend.model.Confirmation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationRepository extends JpaRepository<Confirmation, Long> {
}
