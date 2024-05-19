package dev.skyherobrine.server.feigns;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient("MINISTRYSERVICE")
public interface StudentScore {

    @GetMapping("api/course-class-scheduled/list-students-enroll/{id}")
    List<? extends Object> getListStudentsEnrollCourseClassScheduled(@PathVariable String id);
}
