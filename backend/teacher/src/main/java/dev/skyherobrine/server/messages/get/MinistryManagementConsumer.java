package dev.skyherobrine.server.messages.get;

import dev.skyherobrine.server.models.Clazz;
import dev.skyherobrine.server.repositories.ClazzRepository;
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
    @Autowired
    private ClazzRepository cr;

    @KafkaListener(topics = "teacher", groupId = "teacher_ministry")
    public void addTeacher(String message) {
        Teacher teacher = (Teacher) JsonParserMessage.parseToObject(message, Teacher.class);
        tr.save(teacher);
    }

    @KafkaListener(topics = "class", groupId = "teacher_ministry")
    public void addClazz(String message) {
        Clazz clazz = (Clazz) JsonParserMessage.parseToObject(message, Clazz.class);
        cr.save(clazz);
    }
}
