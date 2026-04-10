package com.urlshortener.service;

import org.springframework.stereotype.Component;

@Component
public class Base62Encoder {

    private static final String ALLOWED_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = ALLOWED_CHARS.length();

    public String encode(long value) {
        // Enforce 7-character minimum by offsetting the value by 62^6 - 1
        value += 56800235583L;

        if (value == 0) {
            return String.valueOf(ALLOWED_CHARS.charAt(0));
        }

        StringBuilder sb = new StringBuilder();
        while (value > 0) {
            sb.append(ALLOWED_CHARS.charAt((int) (value % BASE)));
            value /= BASE;
        }
        
        return sb.reverse().toString();
    }
}
