package dev.skyherobrine.server.messages.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.*;
import dev.skyherobrine.server.repositories.*;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private CourseRepository cr;
    @Autowired
    private StudentRepository sr;
    @Autowired
    private ClazzRepository clazzRepository;
    @Autowired
    private CourseClassScheduledRepository ccsr;
    @Autowired
    private CourseClassRepository courseClassRepository;

    private LocalDate convertStringToDate(String date) {
        String[] splitDate = date.split("-");
        return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
    }

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

    @KafkaListener(topics = "update_course_class_scheduled", groupId = "student_ministry")
    public void addCourseClassScheduled(String message) {
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        CourseClassScheduled ccs = new CourseClassScheduled(
                object.get("room").getAsString(),
                object.get("fromLessonTime").getAsInt(),
                object.get("toLessonTime").getAsInt(),
                convertStringToDate(object.get("fromDate").getAsString()),
                convertStringToDate(object.get("toDate").getAsString()),
                object.get("groupPractice").getAsInt(),
                object.get("maxStudents").getAsInt(),
                object.get("teacherId").getAsJsonObject().get("id").getAsString(),
                courseClassRepository.findById(object.get("courseClassID").getAsJsonObject().get("courseClassId").getAsString()).get(),
                object.get("dayOfWeek").getAsInt()
        );
        ccsr.save(ccs);
    }

    @KafkaListener(topics = "update_course_class", groupId = "student_ministry")
    public void addCourseClass(String message) {
        CourseClass target = (CourseClass) JsonParserMessage.parseToObject(message, CourseClass.class);
        courseClassRepository.save(target);
    }
}
