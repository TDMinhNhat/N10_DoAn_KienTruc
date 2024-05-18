package dev.skyherobrine.server.messages.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.Clazz;
import dev.skyherobrine.server.models.Course;
import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.repositories.ClazzRepository;
import dev.skyherobrine.server.repositories.CourseRepository;
import dev.skyherobrine.server.repositories.StudentRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private CourseRepository cr;
    @Autowired
    private StudentRepository sr;
    @Autowired
    private ClazzRepository clazzRepository;

    @KafkaListener(topics = "course", groupId = "student_ministry")
    public void addCourse(String message) {
        Course target = (Course) JsonParserMessage.parseToObject(message, Course.class);
        cr.save(target);
    }

    @KafkaListener(topics = "student", groupId = "student_ministry")
    public void addStudent(String message) {
        Student student = (Student) JsonParserMessage.parseToObject(message, Student.class);
        sr.save(student);
    }

    @KafkaListener(topics = "class", groupId = "student_ministry")
    public void addClazz(String message){
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        Clazz clazz = new Clazz(
                object.get("shortClassName").getAsString(),
                object.get("fullClassName").getAsString(),
                object.get("teacherId").getAsJsonObject().get("id").getAsString()
        );
        clazzRepository.save(clazz);
    }
}
