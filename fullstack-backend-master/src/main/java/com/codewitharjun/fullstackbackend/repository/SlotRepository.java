package com.codewitharjun.fullstackbackend.repository;

import com.codewitharjun.fullstackbackend.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlotRepository extends JpaRepository<Slot, Long> {
}
