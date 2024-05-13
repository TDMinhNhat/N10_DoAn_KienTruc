package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.messages.send.ManagementProducer;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.models.Student;
import dev.skyherobrine.server.models.enums.StudentStatus;
import dev.skyherobrine.server.repositories.StudentRepositories;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/student-management")
public class StudentManagementController implements IManagement<Student, String> {

    @Autowired
    private StudentRepositories sr;
    @Autowired
    private ManagementProducer producer;

    @PutMapping("add")
    @Override
    public ResponseEntity add(@RequestBody Student student) {
        try {
            Student target = sr.save(student);
            producer.sendManagementMessage("student", JsonParserMessage.parseToJson(target));
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Student added successfully",
                    new HashMap<>() {
                        {
                            put("data", target);
                        }
                    }
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                            HttpStatus.CONFLICT.value(),
                            "Failed to add student",
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
    public ResponseEntity update(Student student) {
        return null;
    }

    @DeleteMapping("delete/{id}")
    @Override
    public ResponseEntity delete(@PathVariable String s) {
        Student target = sr.findById(s).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Student not found",
                    new HashMap<>() {
                        {
                            put("data", null);
                        }
                    }
            ));
        }

        target.setStudentStatus(StudentStatus.EXPULSION);

        try {
            target = sr.save(target);
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Student deleted successfully",
                    null
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                            HttpStatus.CONFLICT.value(),
                            "Failed to delete student",
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
    public ResponseEntity getById(@PathVariable String s) {
        Student target = sr.findById(s).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Student not found",
                    new HashMap<>() {
                        {
                            put("data", null);
                        }
                    }
            ));
        } else {
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Student found",
                    new HashMap<>() {
                        {
                            put("data", target);
                        }
                    }
            ));
        }
    }

    @GetMapping("get-all")
    @Override
    public ResponseEntity getAll() {
        return ResponseEntity.ok(
                new Response(
                        HttpStatus.OK.value(),
                        "Get all students",
                        new HashMap<>() {
                            {
                                put("data", sr.findAll());
                            }
                        }
        ));
    }
}
