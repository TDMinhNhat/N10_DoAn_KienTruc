package dev.skyherobrine.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableDiscoveryClient
@EnableJpaRepositories("dev.skyherobrine.server.repositories")
public class AuthenticateServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(AuthenticateServiceApplication.class, args);
    }
}