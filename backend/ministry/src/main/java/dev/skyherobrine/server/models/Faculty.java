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
    @Column(name = "Description", length = 100)
    private String description;

    public Faculty(String facultyID, String facultyName) {
        this.facultyID = facultyID;
        this.facultyName = facultyName;
    }

    public Faculty(String facultyID, String facultyName, String description) {
        this.facultyID = facultyID;
        this.facultyName = facultyName;
        this.description = description;
    }
}
