package com.urlshortener.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

@Configuration
public class AsyncConfig {

    @Bean(name = "taskExecutor")
    public Executor taskExecutor() {
        // Leverages Java 21 Virtual Threads for lightweight Goroutine-style concurrency
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
