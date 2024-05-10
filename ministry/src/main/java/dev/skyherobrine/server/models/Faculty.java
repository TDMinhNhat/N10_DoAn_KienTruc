package dev.skyherobrine.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "Faculty")
@Getter @Setter @NoArgsConstructor
public class Faculty {
    @Id @Column(name = "FacultyID", nullable = false)
    private String facultyID;
    @Column(name = "FacultyName", nullable = false)
    private String facultyName;
    @ManyToOne @JoinColumn(name = "DepartmentID", nullable = false)
    private Department department;
    @Column(name = "Description", length = 100)
    private String description;

    public Faculty(String facultyID, String facultyName, Department department) {
        this.facultyID = facultyID;
        this.facultyName = facultyName;
        this.department = department;
    }

    public Faculty(String facultyID, String facultyName, Department department, String description) {
        this.facultyID = facultyID;
        this.facultyName = facultyName;
        this.department = department;
        this.description = description;
    }
}
