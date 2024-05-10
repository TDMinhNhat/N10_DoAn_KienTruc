package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.TeacherLevel;
import dev.skyherobrine.server.models.enums.TeacherStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity @Table(name = "Teacher")
@Getter @Setter @NoArgsConstructor
public class Teacher extends Person{
    @Enumerated(EnumType.STRING) @Column(name = "TeacherLevel", nullable = false)
    private TeacherLevel level;
    @Enumerated(EnumType.STRING) @Column(name = "Status", nullable = false)
    private TeacherStatus teacherStatus;

    public Teacher(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String password, Faculty facultyID, TeacherLevel level) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, password, facultyID);
        this.level = level;
        this.teacherStatus = TeacherStatus.ACTIVE;
    }

    public Teacher(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String avatar, String password, Faculty facultyID, TeacherLevel level) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, avatar, password, facultyID);
        this.level = level;
        this.teacherStatus = TeacherStatus.ACTIVE;
    }
}
