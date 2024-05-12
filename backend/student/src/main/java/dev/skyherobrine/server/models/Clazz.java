package dev.skyherobrine.server.models;

import lombok.*;
import jakarta.persistence.*;

@Entity @Table(name = "Class")
@Getter @Setter @NoArgsConstructor
public class Clazz {
    @Id @Column(name = "ShortClassName", length = 20)
    private String shortClassName;
    @Column(name = "FullClassName", length = 100, unique = true)
    private String fullClassName;
    @Column(name = "TeacherID", length = 10, nullable = false)
    private String teacherId;

    public Clazz(String shortClassName, String fullClassName, String teacherId) {
        this.shortClassName = shortClassName;
        this.fullClassName = fullClassName;
        this.teacherId = teacherId;
    }
}