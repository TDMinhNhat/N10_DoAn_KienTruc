package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.CourseClassStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Table(name = "CourseClass")
@Getter @Setter @NoArgsConstructor
public class CourseClass {
    @Id @Column(name = "CourseClassID", length = 20)
    private String courseClassId;
    @Column(name = "ShortName", length = 50, nullable = false)
    private String shortName;
    @Column(name = "FullName", length = 100, nullable = false)
    private String fullName;
    @Column(name = "SemesterYear", length = 20, nullable = false)
    private String semesterYear;
    @ManyToOne @JoinColumn(name = "FacultyID", nullable = false)
    private Faculty facultyID;
    @ManyToOne @JoinColumn(name = "CourseID", nullable = false)
    private Course courseID;
    @Column(name = "Semester", nullable = false)
    private int semester;
    @Enumerated(EnumType.STRING) @Column(name = "Status", nullable = false)
    private CourseClassStatus status;

    public CourseClass(String courseClassId, String shortName, String fullName, String semesterYear, Faculty facultyID, Course courseID, int semester, CourseClassStatus status) {
        this.courseClassId = courseClassId;
        this.shortName = shortName;
        this.fullName = fullName;
        this.semesterYear = semesterYear;
        this.facultyID = facultyID;
        this.courseID = courseID;
        this.semester = semester;
        this.status = status;
    }
}
