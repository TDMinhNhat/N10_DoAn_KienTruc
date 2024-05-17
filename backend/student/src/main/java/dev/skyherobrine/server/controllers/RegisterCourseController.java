package dev.skyherobrine.server.controllers;

import dev.skyherobrine.server.models.EnrollCourse;
import dev.skyherobrine.server.repositories.EnrollCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/register-course")
public class RegisterCourseController {

    @Autowired
    private EnrollCourseRepository ecr;


}
