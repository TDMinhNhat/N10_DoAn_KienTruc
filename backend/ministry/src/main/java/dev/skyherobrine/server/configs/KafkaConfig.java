package dev.skyherobrine.server.configs;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic teacherTopic() {
        return TopicBuilder
                .name("teacher")
                .build();
    }

    @Bean
    public NewTopic studentTopic() {
        return TopicBuilder
                .name("student")
                .build();
    }

    @Bean
    public NewTopic courseTopic() {
        return TopicBuilder.name("course").build();
    }

    @Bean
    public NewTopic updateMinistryTopic() {
        return TopicBuilder.name("update_ministry").build();
    }
}
