package dev.skyherobrine.server.message.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.models.enums.EducationLevel;
import dev.skyherobrine.server.models.enums.EducationType;
import dev.skyherobrine.server.repositories.StudentRepository;
import dev.skyherobrine.server.repositories.TeacherRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private StudentRepository sr;
    @Autowired
    private TeacherRepository tr;

    private LocalDate convertStringToDate(String date) {
        String[] splitDate = date.split("-");
        return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
    }

    @KafkaListener(topics = "student", groupId = "authenticate_ministry")
    public void addStudent(String message) {
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        Student student = new Student(
                object.get("id").getAsString(),
                object.get("fullName").getAsString(),
                object.get("sex").getAsBoolean(),
                convertStringToDate(object.get("birthDay").getAsString()),
                object.get("cityBorn").getAsString(),
                object.get("address").getAsString(),
                object.get("phoneNumber").getAsString(),
                object.get("email").getAsString(),
                object.get("password").getAsString(),
                object.get("facultyID").getAsJsonObject().get("facultyID").getAsString(),
                object.get("courseYear").getAsString(),
                convertStringToDate(object.get("dateEnrolled").getAsString()),
                EducationType.valueOf(object.get("type").getAsString()),
                object.get("clazz").getAsString(),
                EducationLevel.valueOf(object.get("level").getAsString())
        );
        sr.save(student);
    }

    @KafkaListener(topics = "teacher", groupId = "authenticate_ministry")
    public void addTeacher(String message) {
        Teacher teacher = (Teacher) JsonParserMessage.parseToObject(message, Teacher.class);
        tr.save(teacher);
    }
}
