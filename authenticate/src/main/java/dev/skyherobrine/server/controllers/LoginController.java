package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.models.*;
import dev.skyherobrine.server.repositories.MinistryRepository;
import dev.skyherobrine.server.repositories.StudentRepository;
import dev.skyherobrine.server.repositories.TeacherRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/login")
public class LoginController {

    private StudentRepository sr;
    private TeacherRepository tr;
    private MinistryRepository mr;

    public LoginController(StudentRepository sr, TeacherRepository tr, MinistryRepository mr) {
        this.sr = sr;
        this.tr = tr;
        this.mr = mr;
    }

    private String checkRole(Person person) {
        if(person instanceof Student) {
            return "student";
        } else if(person instanceof Teacher) {
            return "teacher";
        } else if(person instanceof Ministry) {
            return "ministry";
        }
        return "";
    }

    @GetMapping("{id}/{password}")
    public ResponseEntity login(@PathVariable String id, @PathVariable String password) {
        Person person = sr.findByIdAndPassword(id, Base64.getEncoder().encode(password.getBytes()).toString()).orElse(null);
        person = person == null ? tr.findByIdAndPassword(id, Base64.getEncoder().encode(password.getBytes()).toString()).orElse(null) : person;
        person = person == null ? mr.findByIdAndPassword(id, Base64.getEncoder().encode(password.getBytes()).toString()).orElse(null) : person;

        Map<String,Object> datas = new HashMap<>();
        datas.put("person", person);
        datas.put("role", checkRole(person));
        if(person == null) {
            return ResponseEntity.ok(new Response(
                    HttpStatus.NOT_FOUND.value(),
                    "Can't find the person with id = " + id + " and password = " + password,
                    datas));
        }
        return ResponseEntity.ok(new Response(
                HttpStatus.FOUND.value(),
                "Find person succesfully!",
                datas
        ));
    }
}
