package dev.skyherobrine.server.feigns;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("TEACHERSERVICE")
public interface TeacherInformation {

    @GetMapping("api/teacher-feign/get-by-id/{id}")
    Object getPersonalInfo(@PathVariable String id);
}
