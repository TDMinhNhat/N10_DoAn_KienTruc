package dev.skyherobrine.server.models.keys;

import dev.skyherobrine.server.models.Course;
import dev.skyherobrine.server.models.Faculty;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Embeddable
@Getter @Setter @NoArgsConstructor
public class CourseFacultyID implements Serializable {
    @ManyToOne @JoinColumn(name = "CourseID", nullable = false)
    private Course course;
    @ManyToOne @JoinColumn(name = "FacultyID", nullable = false)
    private Faculty faculty;
}
