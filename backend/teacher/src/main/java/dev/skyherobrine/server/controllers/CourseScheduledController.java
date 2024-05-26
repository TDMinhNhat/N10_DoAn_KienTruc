package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.dto.CourseScheduleDTO;
import dev.skyherobrine.server.feigns.GetDataFromMinistry;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.CourseClassScheduledRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/course-scheduled")
public class CourseScheduledController {

    @Autowired
    private CourseClassScheduledRepository ccsr;
    @Autowired
    private GetDataFromMinistry data;

    @GetMapping("get-list/{teacherID}")
    public ResponseEntity getListCourseClassScheduled(@PathVariable String teacherID) {
        List<CourseScheduleDTO> dtos = new ArrayList<>();
        ccsr.findByTeacherId_Id(teacherID).forEach(target -> {
            dtos.add(new CourseScheduleDTO(
                    target,
                    data.getCourseInfo(target.getCourseClassID().getCourseID())
            ));
        });
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list course class scheduled",
                new HashMap<>(){{
                    put("data", dtos);
                }}
        ));
    }
}
