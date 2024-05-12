package dev.skyherobrine.server.messages.get;

import dev.skyherobrine.server.repositories.TeacherRepository;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private TeacherRepository tr;

    @KafkaListener(topics = "teacher", groupId = "ministry")
    public void addTeacher(String message) {
        Teacher teacher = (Teacher) JsonParserMessage.parseToObject(message, Teacher.class);
        tr.save(teacher);
    }
}
