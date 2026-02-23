package com.codewitharjun.fullstackbackend.controller;

import com.codewitharjun.fullstackbackend.model.Carousel;
import com.codewitharjun.fullstackbackend.repository.CarouselRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class CarouselController {

    @Autowired
    private CarouselRepository carouselRepository;

    // CREATE
    @PostMapping("/carousel")
    public Carousel createCarousel(@RequestBody Carousel carousel) {
        return carouselRepository.save(carousel);
    }

    // READ ALL
    @GetMapping("/carousels")
    public List<Carousel> getAllCarousels() {
        return carouselRepository.findAll();
    }

    // READ BY ID
    @GetMapping("/carousel/{id}")
    public Carousel getCarouselById(@PathVariable Long id) {
        return carouselRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Carousel not found with id " + id));
    }

    // UPDATE
    @PutMapping("/carousel/{id}")
    public Carousel updateCarousel(
            @RequestBody Carousel newCarousel,
            @PathVariable Long id) {

        return carouselRepository.findById(id)
                .map(carousel -> {
                    carousel.setTitle(newCarousel.getTitle());
                    carousel.setDescription(newCarousel.getDescription());
                    return carouselRepository.save(carousel);
                })
                .orElseThrow(() -> new RuntimeException("Carousel not found with id " + id));
    }

    // DELETE
    @DeleteMapping("/carousel/{id}")
    public String deleteCarousel(@PathVariable Long id) {
        carouselRepository.deleteById(id);
        return "Carousel with id " + id + " deleted successfully.";
    }
}
