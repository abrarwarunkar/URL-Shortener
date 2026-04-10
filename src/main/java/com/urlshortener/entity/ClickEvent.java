package com.urlshortener.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "click_events", indexes = {
        @Index(name = "idx_clicks_short_code", columnList = "shortCode")
})
@Getter
@Setter
@NoArgsConstructor
public class ClickEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private String shortCode;

    @Column(nullable = false, updatable = false)
    private String ipAddress;

    @Column(length = 500, updatable = false)
    private String userAgent;

    @Column(nullable = false, updatable = false)
    private LocalDateTime clickedAt = LocalDateTime.now();

    public ClickEvent(String shortCode, String ipAddress, String userAgent) {
        this.shortCode = shortCode;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
    }
}
