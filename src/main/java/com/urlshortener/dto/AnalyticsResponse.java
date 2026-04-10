package com.urlshortener.dto;

import java.time.LocalDateTime;
import java.util.List;

public record AnalyticsResponse(
        String originalUrl,
        String shortCode,
        long totalClicks,
        List<ClickDetail> recentClicks
) {
    public record ClickDetail(
            String ipAddress,
            String userAgent,
            LocalDateTime clickedAt
    ) {}
}
