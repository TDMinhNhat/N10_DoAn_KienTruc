package dev.skyherobrine.server.controllers.feigns;

import dev.skyherobrine.server.models.Teacher;
import dev.skyherobrine.server.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/teacher-feign")
public class TeacherFeign {

    @Autowired
    private TeacherRepository tr;

    @GetMapping("get-by-id/{id}")
    public Object getTeacherInfo(@PathVariable String id) {
        return new HashMap<>() {{
            put("data", tr.findById(id).orElse(null));
        }};
    }
}
