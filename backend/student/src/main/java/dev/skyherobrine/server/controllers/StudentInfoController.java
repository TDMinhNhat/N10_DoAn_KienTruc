package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.models.*;
import dev.skyherobrine.server.repositories.EnrollCourseRepository;
import dev.skyherobrine.server.repositories.StudentRepositories;
import dev.skyherobrine.server.services.StudentInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/student-info")
public class StudentInfoController {

    @Autowired
    private StudentRepositories sr;
    @Autowired
    private StudentInfoService sis;

    @GetMapping("get-personal-info/{id}")
    public ResponseEntity getPersonalInfo(@PathVariable String id) {
        Student target = sr.findById(id).orElse(null);
        Map<String, Object> data = new HashMap<>();
        data.put("data", target);
        if(target == null)
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the student with id = " + id,
                    data
                    )
            );
        else
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Found the student",
                    data
                    )
            );
    }

    @GetMapping("get-achieve-study/{id}")
    public ResponseEntity getAchieveStudyInfo(@PathVariable String id) {
        Map<String, Object> data = new HashMap<>();
        data.put("data", sis.getAchieveStudyInfo(id));
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "List of study achievements of student with id = " + id,
                data
                )
        );
    }
}
