package com.codewitharjun.fullstackbackend.controller;

import com.codewitharjun.fullstackbackend.model.Confirmation;
import com.codewitharjun.fullstackbackend.repository.ConfirmationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ConfirmationController {

    @Autowired
    private ConfirmationRepository confirmationRepository;

    // CREATE a new confirmation
    @PostMapping("/confirmation")
    public Confirmation createConfirmation(@RequestBody Confirmation confirmation) {

        // Safety check to avoid 'customerId' null error
        if (confirmation.getCustomerId() == null) {
            throw new RuntimeException("customerId is required");
        }

        if (confirmation.getSlotId() == null) {
            throw new RuntimeException("slotId is required");
        }

        return confirmationRepository.save(confirmation);
    }

    // READ all confirmations
    @GetMapping("/confirmations")
    public List<Confirmation> getAllConfirmations() {
        return confirmationRepository.findAll();
    }

    // READ confirmation by ID
    @GetMapping("/confirmation/{id}")
    public Confirmation getConfirmationById(@PathVariable Long id) {
        return confirmationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Confirmation not found with id: " + id));
    }

    // UPDATE a confirmation
    @PutMapping("/confirmation/{id}")
    public Confirmation updateConfirmation(
            @PathVariable Long id,
            @RequestBody Confirmation updatedConfirmation) {

        return confirmationRepository.findById(id)
                .map(confirmation -> {
                    confirmation.setCustomerId(updatedConfirmation.getCustomerId());
                    confirmation.setSlotId(updatedConfirmation.getSlotId());
                    confirmation.setCustomerName(updatedConfirmation.getCustomerName());
                    confirmation.setMobileNumber(updatedConfirmation.getMobileNumber());
                    confirmation.setBookingDate(updatedConfirmation.getBookingDate());
                    confirmation.setGameType(updatedConfirmation.getGameType());
                    confirmation.setStartTime(updatedConfirmation.getStartTime());
                    confirmation.setEndTime(updatedConfirmation.getEndTime());
                    return confirmationRepository.save(confirmation);
                })
                .orElseThrow(() -> new RuntimeException("Confirmation not found with id: " + id));
    }

    // DELETE a confirmation
    @DeleteMapping("/confirmation/{id}")
    public String deleteConfirmation(@PathVariable Long id) {
        if (!confirmationRepository.existsById(id)) {
            throw new RuntimeException("Confirmation not found with id: " + id);
        }
        confirmationRepository.deleteById(id);
        return "Confirmation with id " + id + " deleted successfully.";
    }
}
