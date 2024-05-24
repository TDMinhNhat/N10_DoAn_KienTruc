package dev.skyherobrine.server.messages.send;

import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class StudentProducer {

    @Autowired
    private KafkaTemplate<String,Object> template;

    public void sendUpdateStudent(Object obj) {
        template.send("update_student_info", JsonParserMessage.parseToJson(obj));
    }

    public void sendRegisterCourseStudent(Object obj) {
        template.send("register_course_student", JsonParserMessage.parseToJson(obj));
    }
}
