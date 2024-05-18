package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.messages.send.StudentProducer;
import dev.skyherobrine.server.models.*;
import dev.skyherobrine.server.repositories.CourseClassRepository;
import dev.skyherobrine.server.repositories.CourseClassScheduledRepository;
import dev.skyherobrine.server.repositories.EnrollCourseRepository;
import dev.skyherobrine.server.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/course-scheduled")
public class RegisterCourseController {

    @Autowired
    private EnrollCourseRepository ecr;
    @Autowired
    private CourseClassScheduledRepository ccsr;
    @Autowired
    private StudentRepository sr;
    @Autowired
    private StudentProducer sp;
    @Autowired
    private CourseClassRepository ccr;

    @PutMapping({"register/{idStudent}/{theoryScheduled}",
            "register/{idStudent}/{theoryScheduled}/{practiceGroup}"})
    public ResponseEntity registerCourse(@PathVariable String idStudent,
                                         @PathVariable String theoryScheduled,
                                         @PathVariable(required = false, value = "") String practiceGroup) {

        try {
            Student target = sr.findById(idStudent).orElse(null);
            if(target == null) {
                return ResponseEntity.ok(new Response(
                        HttpStatus.NOT_FOUND.value(),
                        "Can't find the student with id = " + idStudent,
                        new HashMap<>() {{
                            put("data", null);
                        }}
                ));
            }

            CourseClassScheduled theory = ccsr.findByCourseClassIDAndGroupPracticeNull(ccr.findById(theoryScheduled).get()).get();
            if(ecr.findByStudent(target)
                    .stream()
                    .filter(ec -> ec.getCcsID().getCourseClassID().getSemesterYear() != theory.getCourseClassID().getSemesterYear())
                    .filter(ec -> ec.getCcsID().getCourseClassID().getSemester() != theory.getCourseClassID().getSemester())
                    .filter(ec -> ec.getCcsID().getDayOfWeek() != theory.getDayOfWeek())
                    .filter(ec -> ec.getCcsID().getFromLessonTime() >= theory.getFromLessonTime() && ec.getCcsID().getToLessonTime() <= theory.getToLessonTime())
                    .count() > 0) {
                return ResponseEntity.ok(new Response(
                        HttpStatus.BAD_REQUEST.value(),
                        "Conflict Theory Time",
                        new HashMap<>() {{
                            put("data", null);
                        }}));
            }

            CourseClassScheduled practice;
            if(practiceGroup != null && practiceGroup != "") {
                practice = ccsr.findByCourseClassIDAndGroupPractice(theory.getCourseClassID(), Integer.parseInt(practiceGroup)).get();
                if(ecr.findByStudent(target)
                        .stream()
                        .filter(ec -> ec.getCcsID().getCourseClassID().getSemesterYear() != practice.getCourseClassID().getSemesterYear())
                        .filter(ec -> ec.getCcsID().getCourseClassID().getSemester() != practice.getCourseClassID().getSemester())
                        .filter(ec -> ec.getCcsID().getDayOfWeek() != practice.getDayOfWeek())
                        .filter(ec -> ec.getCcsID().getFromLessonTime() >= practice.getFromLessonTime() && ec.getCcsID().getToLessonTime() <= practice.getToLessonTime())
                        .count() > 0) {
                    return ResponseEntity.ok(new Response(
                            HttpStatus.BAD_REQUEST.value(),
                            "Conflict Practice Time",
                            new HashMap<>() {{
                                put("data", null);
                            }}));
                }
            } else {
                practice = null;
            }

            EnrollCourse courseTheory = new EnrollCourse(target, theory);
            ecr.save(courseTheory);
            courseTheory.setAverage(null);
            sp.sendRegisterCourseStudent(courseTheory);

            if(practiceGroup != null) {
                EnrollCourse enrollPractice = new EnrollCourse(target, practice);
                ecr.save(enrollPractice);
                enrollPractice.setAverage(null);
                sp.sendRegisterCourseStudent(enrollPractice);
            }

            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Register Course Successfully",
                    new HashMap<>() {{
                        put("data", new HashMap<>(){{
                            put("theory", courseTheory);
                            put("practice", practiceGroup == null ? null : practiceGroup);
                        }});
                    }}));
        } catch(Exception e) {
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

    @GetMapping("list-course-scheduled/{studentId}")
    public ResponseEntity getListCourseScheduled(@PathVariable String studentId) {
        Student target = sr.findById(studentId).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the student by id = " + studentId,
                    new HashMap<>(){{
                        put("data", null);
                    }}
            ));
        }

        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list course scheduled successfully",
                new HashMap<>(){{
                    put("data", ecr.findByStudent(target));
                }}
        ));
    }

    @GetMapping("get-by-semester-year/{studentID}/{semesterYear}/{facultyID}")
    public ResponseEntity getListCourseScheduledBySemesterYear(@PathVariable String studentID,
                                                               @PathVariable String semesterYear,
                                                               @PathVariable String facultyID) {
        List<Course> listCourse = ecr.findByStudent(sr.findById(studentID).get())
                .stream()
                .map(EnrollCourse::getCcsID)
                .map(CourseClassScheduled::getCourseClassID)
                .map(CourseClass::getCourseID).distinct().toList();

        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get List Course Scheduled",
                new HashMap<>(){{
                    put("data", ccsr.findByCourseClassID_SemesterYearAndCourseClassID_FacultyID_FacultyID(semesterYear, facultyID)
                            .stream()
                            .filter(target -> !listCourse.contains(target.getCourseClassID().getCourseID()))
                            .toList());
                }}
        ));
    }

    @GetMapping("{studentID}")
    public ResponseEntity getListEnrollCourse(@PathVariable String studentID) {
        try {
            Student target = sr.findById(studentID).orElse(null);
            if(target == null) {
                return ResponseEntity.ok(new Response(
                        HttpStatus.NOT_FOUND.value(),
                        "Can't find the student with id = " + studentID,
                        new HashMap<>(){{
                            put("data", null);
                        }}
                ));
            }

            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "List of course scheduled that student enrolled",
                    new HashMap<>(){{
                        put("data", ecr.findByStudent(target).stream().map(EnrollCourse::getCcsID).toList());
                    }}
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Internal Server Error",
                    new HashMap<>(){{
                        put("data", null);
                        put("error", e.getCause());
                    }}
            ));
        }
    }
}
