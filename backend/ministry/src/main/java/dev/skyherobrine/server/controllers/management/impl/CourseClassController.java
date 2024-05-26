package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.messages.send.ManagementProducer;
import dev.skyherobrine.server.models.CourseClass;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.models.enums.CourseClassStatus;
import dev.skyherobrine.server.repositories.CourseClassRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/course-class")
public class CourseClassController implements IManagement<CourseClass,String> {

    @Autowired
    private CourseClassRepository ccr;
    @Autowired
    private ManagementProducer producer;

    @PutMapping("add")
    @Override
    public ResponseEntity add(@RequestBody CourseClass courseClass) {
        try {
            CourseClass target = ccr.save(courseClass);
            producer.sendManagementMessage("update_course_class", JsonParserMessage.parseToJson(target));
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Add successfully!",
                    new HashMap<>(){{
                        put("data", target);
                    }}
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Add failed!",
                    new HashMap<>(){{
                        put("error", e.getCause());
                        put("data", null);
                    }}
            ));
        }
    }

    @Override
    public ResponseEntity update(CourseClass courseClass) {
        return null;
    }

    @GetMapping("delete/{id}")
    @Override
    public ResponseEntity delete(@PathVariable String id) {
        CourseClass courseClass = ccr.findById(id).orElse(null);
        if(courseClass == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the course class id = " + id,
                    new HashMap<>(){{
                        put("data", null);
                    }}
            ));
        }

        ccr.delete(courseClass);
        return ResponseEntity.ok(new Response(
                HttpStatus.ACCEPTED.value(),
                "Successfully!",
                new HashMap<>() {{
                    put("data", null);
                }}
        ));
    }

    @GetMapping("get/{id}")
    @Override
    public ResponseEntity getById(@PathVariable String s) {
        CourseClass target = ccr.findById(s).orElse(null);
        return ResponseEntity.ok(new Response(
                target != null ? HttpStatus.OK.value() : HttpStatus.NOT_FOUND.value(),
                target != null ? "Get successfully!" : "Not found!",
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
                "Get list courses class",
                new HashMap<>(){{
                    put("data", ccr.findAll());
                }}
        ));
    }

    @GetMapping("update-status/{courseClassID}/{status}")
    public ResponseEntity updateStatus(@PathVariable String courseClassID, @PathVariable String status) {
        CourseClass target = ccr.findById(courseClassID).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the course class id = " + courseClassID,
                    new HashMap<>(){{
                        put("data", null);
                    }}
            ));
        }

        target.setStatus(CourseClassStatus.valueOf(status));
        ccr.save(target);
        producer.sendManagementMessage("update_course_class", JsonParserMessage.parseToJson(target));
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Update status successfully!",
                new HashMap<>(){{
                    put("data", target);
                }}
        ));
    }

    @GetMapping("get-list-status")
    public ResponseEntity getListStatus() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Get list status",
                new HashMap<>(){{
                    put("data", CourseClassStatus.values());
                }}
        ));
    }
}
