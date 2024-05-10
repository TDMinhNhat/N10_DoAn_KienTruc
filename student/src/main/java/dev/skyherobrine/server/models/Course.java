package dev.skyherobrine.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
