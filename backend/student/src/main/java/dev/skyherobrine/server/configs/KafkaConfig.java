package dev.skyherobrine.server.configs;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic updateStudentTopic() {
        return TopicBuilder.name("update_student_info").build();
    }

    @Bean
    public NewTopic registerCourseTopic() {
        return TopicBuilder.name("register_course_student").build();
    }

}
