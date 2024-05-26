package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.models.Course;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/course-management")
public class CourseController implements IManagement<Course,String> {

    @Autowired
    private CourseRepository cr;

    @Override
    public ResponseEntity add(Course course) {
        return null;
    }

    @Override
    public ResponseEntity update(Course course) {
        return null;
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get-by-id/{s}")
    @Override
    public ResponseEntity getById(@PathVariable String s) {
        Course target = cr.findById(s).orElse(null);
        return ResponseEntity.ok(new Response(
                target == null ? HttpStatus.NOT_FOUND.value() : HttpStatus.FOUND.value(),
                target == null ? "Can't find the course id = " + s : "Successfully!",
                new HashMap<>(){{
                    put("data", target);
                }}
        ));
    }

    @GetMapping("get-all")
    @Override
    public ResponseEntity getAll() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get all courses!",
                new HashMap<>(){{
                    put("data", cr.findAll());
                }}
        ));
    }

    @GetMapping("get-course-id/{id}")
    public Course getCourseById(@PathVariable String id) {
        return cr.findById(id).orElse(null);
    }
}
