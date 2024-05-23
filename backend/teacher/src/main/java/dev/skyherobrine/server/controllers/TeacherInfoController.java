package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/teacher-info")
public class TeacherInfoController {

    @Autowired
    private TeacherRepository tr;

    @GetMapping("get-info/{id}")
    public ResponseEntity getPersonalInfo(@PathVariable String id) {
        Teacher target = tr.findById(id).orElse(null);
        if(target == null)
        {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the teacher with id = " + id,
                    new HashMap<>() {{
                        put("data", null);
                    }}
            ));
        }
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get teacher info successfully",
                new HashMap<>() {{
                    put("data", target);
                }}
        ));
    }

    @PostMapping("update")
    public ResponseEntity updateTeacherInfo(@RequestBody Teacher teacher) {
        try {
            Teacher target = tr.save(teacher);
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Update teacher info successfully",
                    new HashMap<>() {{
                        put("data", target);
                    }}));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Update failed!",
                    new HashMap<>() {{
                        put("error", e.getCause());
                        put("data", null);
                    }}
            ));
        }
    }
}
