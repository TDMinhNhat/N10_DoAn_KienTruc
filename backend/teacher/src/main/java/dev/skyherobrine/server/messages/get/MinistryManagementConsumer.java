package dev.skyherobrine.server.messages.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.Clazz;
import dev.skyherobrine.server.models.CourseClass;
import dev.skyherobrine.server.models.CourseClassScheduled;
import dev.skyherobrine.server.models.enums.CourseClassStatus;
import dev.skyherobrine.server.repositories.*;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.PrintWriter;
import java.time.LocalDate;

@Service
public class MinistryManagementConsumer {

    @Autowired
    private TeacherRepository tr;
    @Autowired
    private ClazzRepository cr;
    @Autowired
    private CourseClassScheduledRepository ccsr;
    @Autowired
    private CourseClassRepository ccr;
    @Autowired
    private FacultyRepository fr;

    private LocalDate convertStringToDate(String date) {
        String[] splitDate = date.split("-");
        return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
    }


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

    @KafkaListener(topics = "update_course_class", groupId = "teacher_ministry")
    public void addCourseClass(String message) {
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        CourseClass target = new CourseClass(
                object.get("courseClassId").getAsString(),
                object.get("shortName").getAsString(),
                object.get("fullName").getAsString(),
                object.get("semesterYear").getAsString(),
                fr.findById(object.get("facultyID").getAsJsonObject().get("facultyID").getAsString()).get(),
                object.get("courseID").getAsJsonObject().get("courseId").getAsString(),
                object.get("semester").getAsInt(),
                CourseClassStatus.valueOf(object.get("status").getAsString())
        );

        ccr.save(target);
    }

    @KafkaListener(topics = "update_course_class_scheduled", groupId = "teacher_ministry")
    public void addCourseClassScheduled(String message) throws Exception{
        JsonObject object = new JsonParser().parse(message).getAsJsonObject();
        CourseClassScheduled ccs = new CourseClassScheduled(
                object.get("room").getAsString(),
                object.get("fromLessonTime").getAsInt(),
                object.get("toLessonTime").getAsInt(),
                convertStringToDate(object.get("fromDate").getAsString()),
                convertStringToDate(object.get("toDate").getAsString()),
                object.get("groupPractice").getAsInt(),
                object.get("maxStudents").getAsInt(),
                tr.findById(object.get("teacherId").getAsJsonObject().get("id").getAsString()).get(),
                ccr.findById(object.get("courseClassID").getAsJsonObject().get("courseClassId").getAsString()).get(),
                object.get("dayOfWeek").getAsInt()
        );
        ccsr.save(ccs);
    }
}
