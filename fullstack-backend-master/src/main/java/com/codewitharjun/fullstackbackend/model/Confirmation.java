package com.codewitharjun.fullstackbackend.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "confirmation")
public class Confirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "confirmationId", nullable = false)
    private Long confirmationId;

    @Column(name = "customerId", nullable = false)
    private Integer customerId;

    @Column(name = "slotId", nullable = false)
    private Long slotId;

    @Column(name = "customerName", nullable = false, length = 100)
    private String customerName;

    @Column(name = "mobileNumber", length = 15)
    private String mobileNumber;

    @Column(name = "bookingDate", nullable = false)
    private LocalDate bookingDate;

    @Column(name = "gameType", nullable = false, length = 50)
    private String gameType;

    @Column(name = "startTime", nullable = false)
    private LocalTime startTime;

    @Column(name = "endTime", nullable = false)
    private LocalTime endTime;

    public Confirmation() {}

    // Getters & Setters
    public Long getConfirmationId() {
        return confirmationId;
    }

    public void setConfirmationId(Long confirmationId) {
        this.confirmationId = confirmationId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Long getSlotId() {
        return slotId;
    }

    public void setSlotId(Long slotId) {
        this.slotId = slotId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getGameType() {
        return gameType;
    }

    public void setGameType(String gameType) {
        this.gameType = gameType;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }
}
