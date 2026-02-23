package com.codewitharjun.fullstackbackend.repository;

import com.codewitharjun.fullstackbackend.model.Carousel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarouselRepository extends JpaRepository<Carousel, Long> {
}
