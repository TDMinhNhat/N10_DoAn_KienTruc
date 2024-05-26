package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/teacher-mangement")
public class TeacherController implements IManagement<Teacher,String> {

    @Autowired
    private TeacherRepository tr;

    @Override
    public ResponseEntity add(Teacher teacher) {
        return null;
    }

    @Override
    public ResponseEntity update(Teacher teacher) {
        return null;
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get-by-id/{s}")
    @Override
    public ResponseEntity getById(@PathVariable String s) {
        Teacher target = tr.findById(s).orElse(null);
        return ResponseEntity.ok(new Response(
                target == null ? HttpStatus.NOT_FOUND.value() : HttpStatus.OK.value(),
                target == null ? "Can't find the teacher id = " + s : "Succesfully!",
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
                "Get list of teachers!",
                new HashMap<>(){{
                    put("data", tr.findAll());
                }}
        ));
    }

    @GetMapping("get-by-faculty/{facultyID}")
    public ResponseEntity getTeachersByFaculty(@PathVariable  String facultyID) {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list of teachers by faculty!",
                new HashMap<>(){{
                    put("data", tr.findByFacultyID_FacultyID(facultyID));
                }}
        ));
    }
}
