package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.CourseClassScheduledRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/course-scheduled")
public class CourseScheduledController {

    @Autowired
    private CourseClassScheduledRepository ccsr;

    @GetMapping("get-list")
    public ResponseEntity getListCourseClassScheduled() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list course class scheduled",
                new HashMap<>(){{
                    put("data", ccsr.findAll());
                }}
        ));
    }
}
