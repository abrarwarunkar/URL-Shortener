# Highly Scalable URL Shortener

A production-grade URL shortener web service built with Java 21, Spring Boot 3, PostgreSQL, Redis, and a **React** frontend. It operates with ultra-low latency, handles high throughput, and correctly implements IP-based rate limiting as well as click tracking analytics.

## Tech Stack
- **Frontend:** React 18, Vite
- **Backend:** Java 21, Spring Boot 3.2.4
- **Database:** PostgreSQL (via Spring Data JPA)
- **Cache & Rate Limiting:** Redis (via Spring Data Redis)
- **Containerization:** Docker & Docker Compose

## Features
- **Collision-free Short Codes:** Leverages PostgreSQL's fast `SEQUENCE` mapping directly to Base62 arrays ensuring guaranteed uniqueness out of the gate.
- **Microsecond Latency Redirects:** Employs a Cache-Aside pattern powered by Redis (`StringRedisTemplate`), fetching and delivering 302 redirects with p99 < 5ms.
- **Asynchronous Analytics:** Offloads click tracking (IP, User-Agent, Timestamp) to a dedicated `ThreadPoolTaskExecutor` ensuring analytics never block the user's redirect.
- **Rate Limiting:** Defends against abuse with a lightweight Token Bucket algorithm directly within Redis, rate-limiting IPs to 10 requests / minute globally.
- **Modern React UI:** Dark-mode glassmorphism interface with copy-to-clipboard, real-time analytics dashboard, and responsive design.

## Setup & Running

This project leverages Docker Compose for seamless orchestration.

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ & npm (for frontend development)
- Java 21 (optional, if building manually)

### Run Backend with Docker Compose
To boot up the PostgreSQL, Redis, and Spring App components simultaneously:

```bash
docker-compose up -d --build
```

The backend API will bind to `localhost:8080`.

### Run Frontend (Development)

```bash
cd frontend
npm install
npm run dev
```

The React app will start at `http://localhost:5173` and proxy API requests to the backend on port 8080.

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

## Project Structure

```
├── src/                    # Spring Boot backend
│   └── main/java/com/urlshortener/
│       ├── config/         # CORS, Async, WebMvc configs
│       ├── controller/     # REST controllers
│       ├── dto/            # Request/Response records
│       ├── entity/         # JPA entities
│       ├── exception/      # Global error handling
│       ├── interceptor/    # Rate limiting interceptor
│       ├── repository/     # Spring Data repositories
│       └── service/        # Business logic
├── frontend/               # React (Vite) frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.js          # API client
│   │   ├── App.jsx         # Root component
│   │   └── index.css       # Design system
│   ├── index.html
│   └── vite.config.js      # Vite config with API proxy
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```
