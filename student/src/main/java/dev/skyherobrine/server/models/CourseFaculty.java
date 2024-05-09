package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.CourseType;
import dev.skyherobrine.server.models.keys.CourseFacultyID;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Table(name = "CourseFaculty")
@Getter @Setter @NoArgsConstructor
public class CourseFaculty {
    @EmbeddedId
    private CourseFacultyID id;
    @Enumerated(EnumType.ORDINAL) @Column(name = "CourseType", nullable = false)
    private CourseType type;
    @Column(name = "Description", length = 200)
    private String description;

    public CourseFaculty(CourseFacultyID id, CourseType type) {
        this.id = id;
        this.type = type;
    }

    public CourseFaculty(CourseFacultyID id, CourseType type, String description) {
        this.id = id;
        this.type = type;
        this.description = description;
    }
}
