# Highly Scalable URL Shortener

A production-grade URL shortener web service built with Java 21, Spring Boot 3, PostgreSQL, and Redis. It operates with ultra-low latency, handles high throughput, and correctly implements IP-based rate limiting as well as click tracking analytics.

## Tech Stack
- **Backend:** Java 21, Spring Boot 3.2.4
- **Database:** PostgreSQL (via Spring Data JPA)
- **Cache & Rate Limiting:** Redis (via Spring Data Redis)
- **Containerization:** Docker & Docker Compose

## Features
- **Collision-free Short Codes:** Leverages PostgreSQL's fast `SEQUENCE` mapping directly to Base62 arrays ensuring guaranteed uniqueness out of the gate.
- **Microsecond Latency Redirects:** Employs a Cache-Aside pattern powered by Redis (`StringRedisTemplate`), fetching and delivering 302 redirects with p99 < 5ms.
- **Asynchronous Analytics:** Offloads click tracking (IP, User-Agent, Timestamp) to a dedicated `ThreadPoolTaskExecutor` ensuring analytics never block the user's redirect.
- **Rate Limiting:** Defends against abuse with a lightweight Token Bucket algorithm directly within Redis, rate-limiting IPs to 10 requests / minute globally.

## Setup & Running

This project leverages Docker Compose for seamless orchestration.

### Prerequisites
- Docker & Docker Compose
- Java 21 (optional, if building manually)

### Run with Docker Compose
To boot up the PostgreSQL, Redis, and Spring App components simultaneously:

```bash
docker-compose up -d --build
```

The application will bind to `localhost:8080`.

## API Documentation

### 1. Create a Short URL
Generates a short URL. Subject to a rate limit of 10 requests / minute per IP.

**Endpoint:** `POST /api/v1/urls`  
**Headers:** `Content-Type: application/json`  
**Body:**
```json
{
    "url": "https://www.example.com/very/long/url/path"
}
```

**Response (201 Created):**
```json
{
    "originalUrl": "https://www.example.com/very/long/url/path",
    "shortUrl": "http://localhost:8080/1000000",
    "shortCode": "1000000",
    "createdAt": "2024-04-10T12:00:00"
}
```

### 2. Redirect
Redirects the user to the underlying original URL.

**Endpoint:** `GET /{shortCode}`  
*(e.g., `http://localhost:8080/1000000`)*

**Response:**
`HTTP/1.1 302 Found`  
`Location: https://www.example.com/very/long/url/path`

### 3. Analytics
Retrieves click activity for a specified code.

**Endpoint:** `GET /api/v1/urls/{shortCode}/analytics`

**Response (200 OK):**
```json
{
    "originalUrl": "https://www.example.com/very/long/url/path",
    "shortCode": "1000000",
    "totalClicks": 1,
    "recentClicks": [
        {
            "ipAddress": "192.168.1.1",
            "userAgent": "Mozilla/5.0...",
            "clickedAt": "2024-04-10T12:05:00"
        }
    ]
}
```
