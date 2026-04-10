package com.urlshortener.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "urls", indexes = {
        @Index(name = "idx_urls_short_code", columnList = "shortCode", unique = true)
})
@Getter
@Setter
@NoArgsConstructor
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "url_seq")
    @SequenceGenerator(name = "url_seq", sequenceName = "urls_id_seq", allocationSize = 1)
    private Long id;

    @Column(nullable = false, updatable = false)
    private String originalUrl;

    @Column(unique = true)
    private String shortCode;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Url(String originalUrl) {
        this.originalUrl = originalUrl;
    }
}
