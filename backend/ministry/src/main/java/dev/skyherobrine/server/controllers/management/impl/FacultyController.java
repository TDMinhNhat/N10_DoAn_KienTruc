package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.models.Faculty;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/faculty-management")
public class FacultyController implements IManagement<Faculty,String> {

    @Autowired
    private FacultyRepository fr;

    @Override
    public ResponseEntity add(Faculty faculty) {
        return null;
    }

    @Override
    public ResponseEntity update(Faculty faculty) {
        return null;
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get-by-id/{s}")
    @Override
    public ResponseEntity getById(@PathVariable String s) {
        Faculty target = fr.findById(s).orElse(null);
        return ResponseEntity.ok(new Response(
                target == null ? HttpStatus.NOT_FOUND.value() : HttpStatus.OK.value(),
                target == null ? "Can't find the faculty with id = " + s : "Successfully!",
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
                "Get all list faculties!",
                new HashMap<>(){{
                    put("data", fr.findAll());
                }}
        ));
    }
}
