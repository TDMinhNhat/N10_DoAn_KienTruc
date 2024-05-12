package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.messages.send.ManagementProducer;
import dev.skyherobrine.server.models.Course;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.CourseRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/course")
public class CourseManagementController implements IManagement<Course, String> {

    @Autowired
    private CourseRepository cr;
    @Autowired
    private ManagementProducer mp;

    @PutMapping("add")
    @Override
    public ResponseEntity add(@RequestBody Course course) {
        try {
            Course target = cr.save(course);
            mp.sendManagementMessage("course", JsonParserMessage.parseToJson(target));
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Course added successfully",
                    new HashMap<>() {{
                        put("course", target);
                    }}
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Failed to add course",
                    new HashMap<>() {{
                        put("error", e.getCause());
                    }}
            ));
        }
    }

    @Override
    public ResponseEntity update(Course course) {
        return null;
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get/{id}")
    @Override
    public ResponseEntity getById(@PathVariable String id) {
        Course target = cr.findById(id).orElse(null);
        if (target != null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Course found",
                    new HashMap<>() {{
                        put("data", target);
                    }}
            ));
        } else {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Course not found",
                    new HashMap<>() {{
                        put("data", null);
                    }}
            ));
        }
    }

    @GetMapping("get-all")
    @Override
    public ResponseEntity getAll() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Courses found",
                new HashMap<>() {{
                    put("data", cr.findAll());
                }}
        ));
    }
}
