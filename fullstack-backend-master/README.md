# TurfMasterPro — Backend

> Spring Boot 2.6.7 + Spring Data JPA + H2 / MySQL

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Programming language |
| Spring Boot | 2.6.7 | Web framework with embedded Tomcat |
| Spring Data JPA | — | Repository abstraction over Hibernate ORM |
| Hibernate | — | JPA implementation for database operations |
| H2 Database | — | In-memory database for development |
| MySQL | 8.x | Production relational database (optional) |
| Maven | — | Build & dependency management |

## Quick Start

```bash
# Windows
.\mvnw.cmd spring-boot:run

# macOS / Linux
./mvnw spring-boot:run
```

The server starts on **`http://localhost:8080`** and auto-seeds dummy data.

## API Endpoints

### Users — `/user`, `/users`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/user` | Create user |
| `GET` | `/users` | List all users |
| `GET` | `/user/{id}` | Get user by ID |
| `PUT` | `/user/{id}` | Update user |
| `DELETE` | `/user/{id}` | Delete user |
| `POST` | `/login` | Authenticate (email + password) |

### Slots — `/slot`, `/slots`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/slot` | Create slot |
| `GET` | `/slots` | List all slots |
| `GET` | `/slot/{id}` | Get slot by ID |
| `PUT` | `/slot/{id}` | Update slot |
| `DELETE` | `/slot/{id}` | Delete slot |

### Carousels — `/carousel`, `/carousels`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/carousel` | Create carousel item |
| `GET` | `/carousels` | List all carousels |
| `GET` | `/carousel/{id}` | Get carousel by ID |
| `PUT` | `/carousel/{id}` | Update carousel |
| `DELETE` | `/carousel/{id}` | Delete carousel |

### Confirmations — `/confirmation`, `/confirmations`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/confirmation` | Create confirmation |
| `GET` | `/confirmations` | List all confirmations |
| `GET` | `/confirmation/{id}` | Get confirmation by ID |
| `PUT` | `/confirmation/{id}` | Update confirmation |
| `DELETE` | `/confirmation/{id}` | Delete confirmation |

## Data Models

### User
| Field | Type | Constraints |
|---|---|---|
| `userId` | Long | PK, auto-generated |
| `fullName` | String | not null |
| `email` | String | not null, unique |
| `password` | String | not null |
| `gender` | Enum | Male, Female, Other |
| `mobileNumber` | String | — |
| `dateOfBirth` | LocalDate | — |

### Slot
| Field | Type | Constraints |
|---|---|---|
| `slotId` | Long | PK, auto-generated |
| `bookingDate` | LocalDate | not null |
| `gameType` | String | not null (e.g., Football, Cricket) |
| `startTime` | LocalTime | not null |
| `endTime` | LocalTime | not null |
| `bookingStatus` | String | not null, default "AVAILABLE" |
| `price` | Integer | not null |

### Carousel
| Field | Type | Constraints |
|---|---|---|
| `id` | Long | PK, auto-generated |
| `title` | String | not null, max 150 |
| `description` | String | not null, max 5000 |
| `img` | String | not null, max 255 (URL) |

### Confirmation
| Field | Type | Constraints |
|---|---|---|
| `confirmationId` | Long | PK, auto-generated |
| `customerId` | Integer | not null |
| `slotId` | Long | not null |
| `customerName` | String | not null, max 100 |
| `mobileNumber` | String | max 15 |
| `bookingDate` | LocalDate | not null |
| `gameType` | String | not null, max 50 |
| `startTime` | LocalTime | not null |
| `endTime` | LocalTime | not null |

## Database Configuration

### Development (H2 — default, zero setup)

```properties
spring.datasource.url=jdbc:h2:mem:turfmasterpro
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

Access the H2 console at `http://localhost:8080/h2-console`.

### Production (MySQL)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/turfMaxProBackend
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

## Project Layout

```
src/main/java/com/codewitharjun/fullstackbackend/
├── FullstackBackendApplication.java    # Entry point
├── DataSeeder.java                     # Seeds dummy data on startup
├── controller/
│   ├── UserController.java
│   ├── SlotController.java
│   ├── CarouselController.java
│   └── ConfirmationController.java
├── model/
│   ├── User.java
│   ├── Slot.java
│   ├── Carousel.java
│   ├── Confirmation.java
│   ├── Gender.java
│   └── LoginRequest.java
├── repository/
│   ├── UserRepository.java
│   ├── SlotRepository.java
│   ├── CarouselRepository.java
│   └── ConfirmationRepository.java
└── exception/
    ├── UserNotFoundException.java
    └── UserNotFoundAdvice.java
```

---

*Part of the [TurfMasterPro](../README.md) project.*
