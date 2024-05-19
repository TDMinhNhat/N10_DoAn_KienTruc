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
public class TeacherUpdateScoreConsumer {

    @Autowired
    private EnrollCourseRepository ecr;

    @KafkaListener(topics = "update_score_student", groupId = "teacher_ministry")
    public void updateScoreStudent(String message) {
        JsonObject object = JsonParser.parseString(message).getAsJsonObject();
        EnrollCourse ec = ecr.findByStudent_IdAndCcsID_IdAndCcsID_GroupPracticeNull(
                object.get("studentID").getAsString(),
                object.get("courseClassScheduledID").getAsLong()
        ).get();

        ec.setRs1(object.get("rs1").getAsDouble());
        ec.setRs2(object.get("rs2").getAsDouble());
        ec.setRs3(object.get("rs3").getAsDouble());
        ec.setPs1(object.get("ps1").getAsDouble());
        ec.setPs2(object.get("ps2").getAsDouble());
        ec.setPs3(object.get("ps3").getAsDouble());
        ec.setMiddleExam(object.get("middleExam").getAsDouble());
        ec.setFinalExam(object.get("finalExam").getAsDouble());

        ecr.save(ec);
    }
}
