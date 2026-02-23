package com.codewitharjun.fullstackbackend.controller;

import com.codewitharjun.fullstackbackend.model.Slot;
import com.codewitharjun.fullstackbackend.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class SlotController {

    @Autowired
    private SlotRepository slotRepository;

    // CREATE a new slot
    @PostMapping("/slot")
    public Slot createSlot(@RequestBody Slot slot) {
        return slotRepository.save(slot);
    }

    // READ all slots
    @GetMapping("/slots")
    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    // READ slot by ID
    @GetMapping("/slot/{id}")
    public Slot getSlotById(@PathVariable Long id) {
        return slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + id));
    }

    // UPDATE a slot
    @PutMapping("/slot/{id}")
    public Slot updateSlot(@PathVariable Long id, @RequestBody Slot updatedSlot) {
        return slotRepository.findById(id)
                .map(slot -> {
                    slot.setBookingDate(updatedSlot.getBookingDate());
                    slot.setGameType(updatedSlot.getGameType());
                    slot.setStartTime(updatedSlot.getStartTime());
                    slot.setEndTime(updatedSlot.getEndTime());
                    slot.setBookingStatus(updatedSlot.getBookingStatus());
                    return slotRepository.save(slot);
                })
                .orElseThrow(() -> new RuntimeException("Slot not found with id: " + id));
    }

    // DELETE a slot
    @DeleteMapping("/slot/{id}")
    public String deleteSlot(@PathVariable Long id) {
        if (!slotRepository.existsById(id)) {
            throw new RuntimeException("Slot not found with id: " + id);
        }
        slotRepository.deleteById(id);
        return "Slot with id " + id + " deleted successfully.";
    }
}


