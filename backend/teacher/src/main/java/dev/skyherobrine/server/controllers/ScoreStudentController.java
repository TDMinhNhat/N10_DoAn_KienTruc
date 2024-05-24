package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.dto.InputScoreStudentDTO;
import dev.skyherobrine.server.feigns.StudentScore;
import dev.skyherobrine.server.messages.send.UpdateScoreStudentProducer;
import dev.skyherobrine.server.models.CourseClass;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.CourseClassRepository;
import dev.skyherobrine.server.repositories.CourseClassScheduledRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/score-student")
public class ScoreStudentController {

    @Autowired
    private StudentScore student;
    @Autowired
    private CourseClassRepository ccr;
    @Autowired
    private CourseClassScheduledRepository ccsr;
    @Autowired
    private UpdateScoreStudentProducer producer;

    @GetMapping("list-students-enroll/{id}")
    public ResponseEntity getListStudentByEnroll(@PathVariable String id){
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list students by enroll course id " + id,
                new HashMap<>(){{
                    put("data", student.getListStudentsEnrollCourseClassScheduled(id));
                }}
        ));
    }

    @GetMapping("list-semester-year")
    public ResponseEntity getListSemesterYear() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list semester year",
                new HashMap<>(){{
                    put("data", ccr.findAll().stream().map(CourseClass::getSemesterYear).distinct().toList());
                }}
        ));
    }

    @GetMapping("list-course-scheduled/{semesterYear}")
    public ResponseEntity getListCourseScheduledBySemesterYear(@PathVariable String semesterYear) {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list course scheduled by semester year " + semesterYear,
                new HashMap<>(){{
                    put("data", ccsr.findByCourseClassID_SemesterYearAndGroupPracticeNull(semesterYear));
                }}
        ));
    }

    @PostMapping("type-score-student")
    public ResponseEntity typeScoreStudent(@RequestBody InputScoreStudentDTO dto) {
        try {
            producer.sendUpdateScoreStudent(JsonParserMessage.parseToJson(dto));
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Type score student successfully",
                    new HashMap<>(){{
                        put("data", dto);
                    }}
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Something wrong when run",
                    new HashMap<>(){{
                        put("data", null);
                        put("error", e.getCause());
                    }}
            ));
        }
    }
}
