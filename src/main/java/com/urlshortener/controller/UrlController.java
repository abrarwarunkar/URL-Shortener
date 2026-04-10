package com.urlshortener.controller;

import com.urlshortener.dto.AnalyticsResponse;
import com.urlshortener.dto.UrlRequest;
import com.urlshortener.dto.UrlResponse;
import com.urlshortener.service.AnalyticsService;
import com.urlshortener.service.UrlService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/urls")
@RequiredArgsConstructor
public class UrlController {

    private final UrlService urlService;
    private final AnalyticsService analyticsService;

    @PostMapping
    public ResponseEntity<UrlResponse> createShortUrl(@Valid @RequestBody UrlRequest request, HttpServletRequest servletRequest) {
        String baseUrl = ServletUriComponentsBuilder.fromContextPath(servletRequest).build().toUriString();
        UrlResponse response = urlService.createShortUrl(request, baseUrl);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{shortCode}/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics(@PathVariable String shortCode) {
        AnalyticsResponse response = analyticsService.getAnalytics(shortCode);
        return ResponseEntity.ok(response);
    }
}
