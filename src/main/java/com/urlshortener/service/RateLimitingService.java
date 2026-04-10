package com.urlshortener.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RateLimitingService {

    private final StringRedisTemplate redisTemplate;

    @Value("${app.rate-limit.capacity:10}")
    private int capacity;

    @Value("${app.rate-limit.replenish-rate:10}")
    private int replenishRate; // per minute

    public boolean allowRequest(String ipAddress) {
        String key = "rate_limit:" + ipAddress;
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        
        String currentStr = ops.get(key);
        int current = currentStr != null ? Integer.parseInt(currentStr) : 0;
        
        if (current >= capacity) {
            return false;
        }
        
        if (current == 0) {
            ops.set(key, "1", Duration.ofMinutes(1));
        } else {
            redisTemplate.opsForValue().increment(key);
        }
        
        return true;
    }
}
