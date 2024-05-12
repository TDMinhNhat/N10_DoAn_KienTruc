package dev.skyherobrine.server.controllers.management.impl;

import dev.skyherobrine.server.controllers.management.IManagement;
import dev.skyherobrine.server.models.Department;
import dev.skyherobrine.server.models.Response;
import dev.skyherobrine.server.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("api/department-management")
public class DepartmentManagementController implements IManagement<Department,String> {

    @Autowired
    private DepartmentRepository dr;

    @Override
    public ResponseEntity add(Department department) {
        return null;
    }

    @Override
    public ResponseEntity update(Department department) {
        return null;
    }

    @Override
    public ResponseEntity delete(String s) {
        return null;
    }

    @GetMapping("get/{id}")
    @Override
    public ResponseEntity getById(@PathVariable String id) {
        Department target = dr.findById(id).orElse(null);
        if(target == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the department by id = " + id,
                    new HashMap<>(){{
                        put("data", null);
                    }}
            ));
        }
        return ResponseEntity.ok(new Response(
                HttpStatus.FOUND.value(),
                "Successfully",
                new HashMap<>(){{
                    put("data", target);
                }}
        ));
    }

    @Override
    public ResponseEntity getAll() {
        return ResponseEntity.ok(new Response(
                HttpStatus.OK.value(),
                "List of departments",
                new HashMap<>(){{
                    put("data", dr.findAll());
                }}
        ));
    }
}
