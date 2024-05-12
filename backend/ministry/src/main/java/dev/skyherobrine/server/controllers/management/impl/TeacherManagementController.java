package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.models.enums.TeacherStatus;
import dev.skyherobrine.server.repositories.TeacherRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/teacher-management")
public class TeacherManagementController implements IManagement<Teacher,String> {
    
    @Autowired
    private TeacherRepositories tr;

    @PutMapping("add")
    @Override
    public ResponseEntity add(@RequestBody Teacher teacher) {
        try {
            Teacher target = tr.save(teacher);
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Teacher added successfully",
                    new HashMap<>() {
                        {
                            put("data", target);
                        }
                    }
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                            HttpStatus.CONFLICT.value(),
                            "Failed to add teacher",
                            new HashMap<>() {
                                {
                                    put("data", null);
                                    put("error_message", e.getCause());
                                }
                            }
                    )
            );
        }
    }

    @Override
    public ResponseEntity update(Teacher teacher) {
        return null;
    }

    @DeleteMapping("delete/{id}")
    @Override
    public ResponseEntity delete(@PathVariable String id) {
        Teacher target = tr.findById(id).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Teacher not found",
                    new HashMap<>() {
                        {
                            put("data", null);
                        }
                    }
            ));
        }

        target.setTeacherStatus(TeacherStatus.DELETED);

        try {
            tr.save(target);
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Teacher deleted successfully",
                    new HashMap<>() {
                        {
                            put("data", target);
                        }
                    }
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new Response(
                            HttpStatus.CONFLICT.value(),
                            "Failed to delete teacher",
                            new HashMap<>() {
                                {
                                    put("data", null);
                                    put("error_message", e.getCause());
                                }
                            }
                    )
            );
        }
    }

    @GetMapping("get/{id}")
    @Override
    public ResponseEntity getById(@PathVariable String id) {
        Teacher target = tr.findById(id).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Teacher not found",
                    new HashMap<>() {
                        {
                            put("data", null);
                        }
                    }
            ));
        }
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Teacher found",
                new HashMap<>() {
                    {
                        put("data", target);
                    }
                }
        ));
    }

    @GetMapping("get-all")
    @Override
    public ResponseEntity getAll() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Teachers found",
                new HashMap<>() {
                    {
                        put("data", tr.findAll());
                    }
                }
        ));
    }
}
