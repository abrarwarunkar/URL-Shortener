package com.urlshortener.service;

import com.urlshortener.dto.AnalyticsResponse;
import com.urlshortener.entity.ClickEvent;
import com.urlshortener.entity.Url;
import com.urlshortener.exception.ResourceNotFoundException;
import com.urlshortener.repository.ClickEventRepository;
import com.urlshortener.repository.UrlRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ClickEventRepository clickEventRepository;
    private final UrlRepository urlRepository;

    @Async
    public void trackClick(String shortCode, String ipAddress, String userAgent) {
        ClickEvent event = new ClickEvent(shortCode, ipAddress, userAgent);
        clickEventRepository.save(event);
    }

    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalytics(String shortCode) {
        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("URL not found"));

        long totalClicks = clickEventRepository.countByShortCode(shortCode);
        
        List<AnalyticsResponse.ClickDetail> recentClicks = clickEventRepository.findByShortCode(shortCode)
                .stream()
                .sorted((a, b) -> b.getClickedAt().compareTo(a.getClickedAt()))
                .limit(50)
                .map(event -> new AnalyticsResponse.ClickDetail(event.getIpAddress(), event.getUserAgent(), event.getClickedAt()))
                .collect(Collectors.toList());

        return new AnalyticsResponse(url.getOriginalUrl(), shortCode, totalClicks, recentClicks);
    }
}
