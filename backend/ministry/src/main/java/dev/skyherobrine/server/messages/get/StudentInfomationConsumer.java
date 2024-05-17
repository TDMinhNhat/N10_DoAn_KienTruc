package dev.skyherobrine.server.messages.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.models.enums.EducationLevel;
import dev.skyherobrine.server.models.enums.EducationType;
import dev.skyherobrine.server.repositories.StudentRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class StudentInfomationConsumer {

    @Autowired
    private StudentRepository sr;

    private LocalDate convertStringToDate(String date) {
        String[] splitDate = date.split("-");
        return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
    }

    @KafkaListener(topics = "update_student_info", groupId = "authenticate_student")
    public void updateStudent(String message) {
        Student target = (Student) JsonParserMessage.parseToObject(message, Student.class);
        sr.save(target);
    }
}
