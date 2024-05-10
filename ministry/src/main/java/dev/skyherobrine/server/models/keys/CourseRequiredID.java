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
public class CourseRequiredID implements Serializable {
    @ManyToOne @JoinColumn(name = "CourseOwned", nullable = false)
    private Course owned;
    @ManyToOne @JoinColumn(name = "CourseRequired", nullable = false)
    private Course required;
    @ManyToOne @JoinColumn(name = "FacultyID", nullable = false)
    private Faculty faculty;
}
