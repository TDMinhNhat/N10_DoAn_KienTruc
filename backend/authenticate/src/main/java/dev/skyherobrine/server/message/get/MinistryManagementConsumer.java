package dev.skyherobrine.server.message.get;

import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.repositories.StudentRepository;
import dev.skyherobrine.server.repositories.TeacherRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private StudentRepository sr;
    @Autowired
    private TeacherRepository tr;

    @KafkaListener(topics = "student", groupId = "ministry")
    public void addStudent(String message) {
        Student student = (Student) JsonParserMessage.parseToObject(message, Student.class);
        sr.save(student);
    }

    @KafkaListener(topics = "teacher", groupId = "ministry")
    public void addTeacher(String message) {
        Teacher teacher = (Teacher) JsonParserMessage.parseToObject(message, Teacher.class);
        tr.save(teacher);
    }
}
