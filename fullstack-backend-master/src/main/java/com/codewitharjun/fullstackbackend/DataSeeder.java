package com.codewitharjun.fullstackbackend;

import com.codewitharjun.fullstackbackend.model.*;
import com.codewitharjun.fullstackbackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SlotRepository slotRepository;

    @Autowired
    private CarouselRepository carouselRepository;

    @Autowired
    private ConfirmationRepository confirmationRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== Seeding dummy data ===");

        // ── Users ──────────────────────────────────────────
        User u1 = new User();
        u1.setFullName("Arjun Gautam");
        u1.setEmail("arjun@example.com");
        u1.setPassword("password123");
        u1.setGender(Gender.Male);
        u1.setMobileNumber("01712345678");
        u1.setDateOfBirth(LocalDate.of(1998, 5, 15));
        userRepository.save(u1);

        User u2 = new User();
        u2.setFullName("Fatima Rahman");
        u2.setEmail("fatima@example.com");
        u2.setPassword("password123");
        u2.setGender(Gender.Female);
        u2.setMobileNumber("01898765432");
        u2.setDateOfBirth(LocalDate.of(2000, 8, 22));
        userRepository.save(u2);

        User u3 = new User();
        u3.setFullName("Sakib Hasan");
        u3.setEmail("sakib@example.com");
        u3.setPassword("password123");
        u3.setGender(Gender.Male);
        u3.setMobileNumber("01611223344");
        u3.setDateOfBirth(LocalDate.of(1995, 1, 10));
        userRepository.save(u3);

        System.out.println("  ✔ 3 users created");

        // ── Slots ──────────────────────────────────────────
        Slot s1 = new Slot();
        s1.setBookingDate(LocalDate.of(2026, 2, 24));
        s1.setGameType("Football");
        s1.setStartTime(LocalTime.of(16, 0));
        s1.setEndTime(LocalTime.of(17, 0));
        s1.setBookingStatus("AVAILABLE");
        s1.setPrice(1500);
        slotRepository.save(s1);

        Slot s2 = new Slot();
        s2.setBookingDate(LocalDate.of(2026, 2, 24));
        s2.setGameType("Football");
        s2.setStartTime(LocalTime.of(17, 0));
        s2.setEndTime(LocalTime.of(18, 0));
        s2.setBookingStatus("AVAILABLE");
        s2.setPrice(1500);
        slotRepository.save(s2);

        Slot s3 = new Slot();
        s3.setBookingDate(LocalDate.of(2026, 2, 24));
        s3.setGameType("Cricket");
        s3.setStartTime(LocalTime.of(18, 0));
        s3.setEndTime(LocalTime.of(19, 0));
        s3.setBookingStatus("BOOKED");
        s3.setPrice(2000);
        slotRepository.save(s3);

        Slot s4 = new Slot();
        s4.setBookingDate(LocalDate.of(2026, 2, 25));
        s4.setGameType("Football");
        s4.setStartTime(LocalTime.of(8, 0));
        s4.setEndTime(LocalTime.of(9, 0));
        s4.setBookingStatus("AVAILABLE");
        s4.setPrice(1200);
        slotRepository.save(s4);

        Slot s5 = new Slot();
        s5.setBookingDate(LocalDate.of(2026, 2, 25));
        s5.setGameType("Cricket");
        s5.setStartTime(LocalTime.of(9, 0));
        s5.setEndTime(LocalTime.of(10, 0));
        s5.setBookingStatus("AVAILABLE");
        s5.setPrice(1800);
        slotRepository.save(s5);

        Slot s6 = new Slot();
        s6.setBookingDate(LocalDate.of(2026, 2, 25));
        s6.setGameType("Football");
        s6.setStartTime(LocalTime.of(19, 0));
        s6.setEndTime(LocalTime.of(20, 0));
        s6.setBookingStatus("AVAILABLE");
        s6.setPrice(2000);
        slotRepository.save(s6);

        System.out.println("  ✔ 6 slots created");

        // ── Carousels ──────────────────────────────────────
        Carousel c1 = new Carousel();
        c1.setTitle("Premium Football Turf");
        c1.setDescription(
                "Experience the thrill of playing on our world-class FIFA-standard artificial turf. Perfect lighting and drainage for year-round play.");
        c1.setImg("https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800");
        carouselRepository.save(c1);

        Carousel c2 = new Carousel();
        c2.setTitle("Cricket Practice Nets");
        c2.setDescription(
                "Sharpen your batting and bowling skills in our professional practice nets with automated bowling machines and coaching support.");
        c2.setImg("https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800");
        carouselRepository.save(c2);

        Carousel c3 = new Carousel();
        c3.setTitle("Book Your Slot Today");
        c3.setDescription(
                "Easy online booking, flexible timings, and affordable rates. Gather your squad and experience the best turf in town!");
        c3.setImg("https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800");
        carouselRepository.save(c3);

        System.out.println("  ✔ 3 carousel items created");

        // ── Confirmations (1 sample booking) ───────────────
        Confirmation conf1 = new Confirmation();
        conf1.setCustomerId(1);
        conf1.setSlotId(s3.getSlotId());
        conf1.setCustomerName("Arjun Gautam");
        conf1.setMobileNumber("01712345678");
        conf1.setBookingDate(LocalDate.of(2026, 2, 24));
        conf1.setGameType("Cricket");
        conf1.setStartTime(LocalTime.of(18, 0));
        conf1.setEndTime(LocalTime.of(19, 0));
        confirmationRepository.save(conf1);

        System.out.println("  ✔ 1 confirmation created");
        System.out.println("=== Dummy data seeding complete! ===");
    }
}
