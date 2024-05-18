package dev.skyherobrine.server.messages.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.EnrollCourse;
import dev.skyherobrine.server.repositories.CourseClassScheduledRepository;
import dev.skyherobrine.server.repositories.EnrollCourseRepository;
import dev.skyherobrine.server.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class StudentRegisterCourseConsumer {
    @Autowired
    private EnrollCourseRepository ecr;
    @Autowired
    private StudentRepository sr;
    @Autowired
    private CourseClassScheduledRepository ccsr;

    @KafkaListener(topics = "register_course_student", groupId = "ministry_student")
    public void registerCourseStudent(String message) throws Exception{
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        EnrollCourse ec = new EnrollCourse(
                sr.findById(object.getAsJsonObject("student").get("id").getAsString()).get(),
                ccsr.findById(object.getAsJsonObject("ccsID").get("id").getAsLong()).get());
        ecr.save(ec);
    }
}
