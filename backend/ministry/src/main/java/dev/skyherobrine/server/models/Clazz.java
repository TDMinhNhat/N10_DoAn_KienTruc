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
    @ManyToOne @JoinColumn(name = "TeacherID", nullable = false)
    private Teacher teacherId;

    public Clazz(String shortClassName, String fullClassName, Teacher teacherId) {
        this.shortClassName = shortClassName;
        this.fullClassName = fullClassName;
        this.teacherId = teacherId;
    }
}
