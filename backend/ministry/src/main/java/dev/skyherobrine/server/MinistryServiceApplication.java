package dev.skyherobrine.server;

import dev.skyherobrine.server.repositories.CourseClassRepository;
import dev.skyherobrine.server.repositories.CourseClassScheduledRepository;
import dev.skyherobrine.server.repositories.EnrollCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MinistryServiceApplication implements CommandLineRunner {

    @Autowired
    private EnrollCourseRepository ecr;
    @Autowired
    private CourseClassScheduledRepository ccsr;
    @Autowired
    private CourseClassRepository ccr;

    public static void main(String[] args) {
        SpringApplication.run(MinistryServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }
}
