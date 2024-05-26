package dev.skyherobrine.server.dto;

import dev.skyherobrine.server.models.CourseClassScheduled;
import lombok.Data;

@Data
public class CourseScheduleDTO {
    private CourseClassScheduled courseClassScheduled;
    private Object subject;

    public CourseScheduleDTO(CourseClassScheduled courseClassScheduled, Object subject) {
        this.courseClassScheduled = courseClassScheduled;
        this.subject = subject;
    }
}
