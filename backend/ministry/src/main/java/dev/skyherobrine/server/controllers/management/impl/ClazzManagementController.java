package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.messages.send.ManagementProducer;
import dev.skyherobrine.server.models.Clazz;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.ClazzRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/class-management")
public class ClazzManagementController implements IManagement<Clazz,String> {

    @Autowired
    private ClazzRepository cr;
    @Autowired
    private ManagementProducer mp;

    @PutMapping("add")
    @Override
    public ResponseEntity add(@RequestBody Clazz clazz) {
        try {
            Clazz target = cr.save(clazz);
            mp.sendManagementMessage("class", JsonParserMessage.parseToJson(target));
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Successfully!",
                    new HashMap<>(){{
                        put("data", target);
                    }}
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Failed!",
                    new HashMap<>(){{
                        put("data", null);
                        put("error_message", e.getCause());
                    }}
            ));
        }
    }

    @Override
    public ResponseEntity update(Clazz clazz) {
        return null;
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get/{id}")
    @Override
    public ResponseEntity getById(@PathVariable String id) {
        Clazz target = cr.findById(id).orElse(null);
        return ResponseEntity.ok(new Response(
                target != null ? HttpStatus.OK.value() : HttpStatus.INTERNAL_SERVER_ERROR.value(),
                target != null ? "Successfully" : "Can't find the class by id = " + id,
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
                "Get list of classes!",
                new HashMap<>(){{
                    put("data", cr.findAll());
                }}
        ));
    }
}
