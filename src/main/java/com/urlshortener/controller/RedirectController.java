package com.urlshortener.controller;

import com.urlshortener.service.AnalyticsService;
import com.urlshortener.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
public class RedirectController {

    private final UrlService urlService;
    private final AnalyticsService analyticsService;

    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirectToOriginalUrl(@PathVariable String shortCode, HttpServletRequest request) {
        String originalUrl = urlService.getOriginalUrl(shortCode);
        
        // Track analytics asynchronously
        String ipAddress = getClientIp(request);
        String userAgent = request.getHeader(HttpHeaders.USER_AGENT);
        analyticsService.trackClick(shortCode, ipAddress, userAgent);
        
        return ResponseEntity.status(HttpStatus.FOUND) // 302 Found
                .location(URI.create(originalUrl))
                .build();
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0];
        }
        return request.getRemoteAddr();
    }
}
