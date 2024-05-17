package dev.skyherobrine.server.message.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.models.enums.EducationLevel;
import dev.skyherobrine.server.models.enums.EducationType;
import dev.skyherobrine.server.repositories.StudentRepository;
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
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        Student target = sr.findById(object.get("id").getAsString()).get();
        target.setFullName(object.get("fullName").getAsString());
        target.setSex(object.get("sex").getAsBoolean());
        target.setBirthDay(convertStringToDate(object.get("birthDay").getAsString()));
        target.setCityBorn(object.get("cityBorn").getAsString());
        target.setAddress(object.get("address").getAsString());
        target.setPhoneNumber(object.get("phoneNumber").getAsString());
        target.setEmail(object.get("email").getAsString());
        target.setPassword(object.get("password").getAsString());
        target.setFacultyID(object.get("facultyID").getAsJsonObject().get("facultyID").getAsString());
        target.setCourseYear(object.get("courseYear").getAsString());
        target.setDateEnrolled(convertStringToDate(object.get("dateEnrolled").getAsString()));
        target.setType(EducationType.valueOf(object.get("type").getAsString()));
        target.setClazz(object.get("clazz") == null ? "" : object.get("clazz").getAsString());
        target.setLevel(EducationLevel.valueOf(object.get("level").getAsString()));
        sr.save(target);
    }
}
