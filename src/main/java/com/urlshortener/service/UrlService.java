package com.urlshortener.service;

import com.urlshortener.dto.UrlRequest;
import com.urlshortener.dto.UrlResponse;
import com.urlshortener.entity.Url;
import com.urlshortener.exception.ResourceNotFoundException;
import com.urlshortener.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class UrlService {

    private final UrlRepository urlRepository;
    private final Base62Encoder base62Encoder;
    private final StringRedisTemplate redisTemplate;

    private static final String CACHE_PREFIX = "url:";
    private static final Duration CACHE_TTL = Duration.ofDays(7);

    @Transactional
    public UrlResponse createShortUrl(UrlRequest request, String baseUrl) {
        Url url = new Url(request.url());
        
        // Save to generate ID from sequence
        Url savedUrl = urlRepository.save(url);
        
        // Generate Base62 short code from the database sequence ID
        String shortCode = base62Encoder.encode(savedUrl.getId());
        savedUrl.setShortCode(shortCode);
        
        // Update entity with short code
        urlRepository.save(savedUrl);
        
        // Cache the original URL
        redisTemplate.opsForValue().set(CACHE_PREFIX + shortCode, request.url(), CACHE_TTL);

        String fullShortUrl = baseUrl + "/" + shortCode;
        return new UrlResponse(request.url(), fullShortUrl, shortCode, savedUrl.getCreatedAt());
    }

    public String getOriginalUrl(String shortCode) {
        // Cache Aside Pattern
        String cacheKey = CACHE_PREFIX + shortCode;
        String cachedUrl = redisTemplate.opsForValue().get(cacheKey);
        
        if (cachedUrl != null) {
            return cachedUrl;
        }

        // Fallback to database
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("Short URL not found"));
        
        // Update cache
        redisTemplate.opsForValue().set(cacheKey, url.getOriginalUrl(), CACHE_TTL);
        
        return url.getOriginalUrl();
    }
}
