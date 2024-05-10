package dev.skyherobrine.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "Course")
@Getter @Setter @NoArgsConstructor
public class Course {
    @Id @Column(name = "CourseID", length = 20)
    private String courseId;
    @Column(name = "CourseName", length = 50, nullable = false)
    private String courseName;
    @Column(name = "Credits", nullable = false)
    private int credits;
    @Column(name = "Description", length = 100)
    private String description;

    public Course(String courseId, String courseName, int credits) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.credits = credits;
    }

    public Course(String courseId, String courseName, int credits, String description) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.credits = credits;
        this.description = description;
    }
}
