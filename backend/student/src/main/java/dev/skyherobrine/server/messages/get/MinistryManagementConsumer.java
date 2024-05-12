package dev.skyherobrine.server.messages.get;

import dev.skyherobrine.server.models.Course;
import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.repositories.CourseRepository;
import dev.skyherobrine.server.repositories.StudentRepositories;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private CourseRepository cr;
    @Autowired
    private StudentRepositories sr;

    @KafkaListener(topics = "course", groupId = "ministry")
    public void addCourse(String message) {
        Course target = (Course) JsonParserMessage.parseToObject(message, Course.class);
        cr.save(target);
    }

    @KafkaListener(topics = "student", groupId = "ministry")
    public void addStudent(String message) {
        Student student = (Student) JsonParserMessage.parseToObject(message, Student.class);
        sr.save(student);
    }
}
