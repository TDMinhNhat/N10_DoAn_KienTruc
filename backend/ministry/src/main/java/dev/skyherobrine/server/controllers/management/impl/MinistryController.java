package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.messages.send.ManagementProducer;
import dev.skyherobrine.server.models.Ministry;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.MinistryRepository;
import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("api/ministry-management")
public class MinistryController implements IManagement<Ministry,String> {
    @Autowired
    private MinistryRepository mr;
    @Autowired
    private ManagementProducer producer;

    @Override
    public ResponseEntity add(Ministry ministry) {
        return null;
    }

    @PostMapping("update")
    @Override
    public ResponseEntity update(@RequestBody Ministry ministry) {
        try {
            Ministry target = mr.save(ministry);
            producer.sendUpdateMinistryMessage(JsonParserMessage.parseToJson(target));
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Successfully!",
                    new HashMap<>() {{
                        put("data", target);
                    }}
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Error!",
                    new HashMap<>() {{
                        put("data", null);
                        put("error", e.getCause());
                    }}
            ));
        }
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get-by-id/{ministryID}")
    @Override
    public ResponseEntity getById(@PathVariable String ministryID) {
        Ministry m = mr.findById(ministryID).orElse(null);
        if(m == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.OK.value(),
                    "Can't find ministry by id = " + ministryID,
                    new HashMap<>() {{
                        put("data", null);
                    }}
            ));
        }

        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "Successfully!",
                new HashMap<>(){{
                    put("data", m);
                }}
        ));
    }

    @Override
    public ResponseEntity getAll() {
        return null;
    }
}
