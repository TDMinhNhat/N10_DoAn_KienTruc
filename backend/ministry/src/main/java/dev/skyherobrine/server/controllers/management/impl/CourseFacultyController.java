package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.models.CourseFaculty;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.models.keys.CourseFacultyID;
import dev.skyherobrine.server.repositories.CourseFacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/course-faculty")
public class CourseFacultyController implements IManagement<CourseFaculty, CourseFacultyID> {

    @Autowired
    private CourseFacultyRepository cfr;

    @Override
    public ResponseEntity add(CourseFaculty courseFaculty) {
        return null;
    }

    @Override
    public ResponseEntity update(CourseFaculty courseFaculty) {
        return null;
    }

    @Override
    public ResponseEntity delete(CourseFacultyID courseFacultyID) {
        return null;
    }

    @GetMapping("get-by-id")
    @Override
    public ResponseEntity getById(@RequestBody CourseFacultyID courseFacultyID) {
        CourseFaculty target = cfr.findById(courseFacultyID).orElse(null);
        return ResponseEntity.ok(new Response(
                target == null ? HttpStatus.NOT_FOUND.value() : HttpStatus.FOUND.value(),
                target == null ? "Can't find the id" : "Succesfully!",
                new HashMap<>(){{
                    put("data", target);
                }}
        ));
    }

    @GetMapping("get-all")
    @Override
    public ResponseEntity getAll() {
        return ResponseEntity.ok(new Response(
                HttpStatus.FOUND.value(),
                "Get all course faculties!",
                new HashMap<>(){{
                    put("data", cfr.findAll());
                }}
        ));
    }

    @GetMapping("get-by-faculty/{facultyID}")
    public ResponseEntity getAllCourseByFaculty(@PathVariable String facultyID) {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get all courses by faculties!",
                new HashMap<>(){{
                    put("data", cfr.findById_Faculty_FacultyID(facultyID));
                }}
        ));
    }
}
