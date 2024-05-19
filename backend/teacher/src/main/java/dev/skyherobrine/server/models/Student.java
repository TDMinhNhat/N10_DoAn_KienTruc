package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.EducationLevel;
import dev.skyherobrine.server.models.enums.EducationType;
import dev.skyherobrine.server.models.enums.StudentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity @Table(name = "Student")
@Getter @Setter @NoArgsConstructor
public class Student extends Person{
    @Column(name = "CourseYear", nullable = false)
    private String courseYear;
    @Column(name = "DateEnrolled", nullable = false)
    private LocalDate dateEnrolled;
    @Enumerated(EnumType.STRING) @Column(name = "EducationType", nullable = false)
    private EducationType type;
    @Enumerated(EnumType.STRING) @Column(name = "EducationLevel", nullable = false)
    private EducationLevel level;
    @ManyToOne @JoinColumn(name = "ShortClassName")
    private Clazz clazz;
    @Enumerated(EnumType.ORDINAL) @Column(name = "Status", nullable = false)
    private StudentStatus studentStatus;

    public Student(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String password, Faculty facultyID, String courseYear, LocalDate dateEnrolled, EducationType type, Clazz clazz, EducationLevel level) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, password, facultyID);
        this.courseYear = courseYear;
        this.dateEnrolled = dateEnrolled;
        this.type = type;
        this.level = level;
        this.clazz = clazz;
        this.studentStatus = StudentStatus.STUDYING;
    }

    public Student(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String avatar, String password, Faculty facultyID, String courseYear, LocalDate dateEnrolled, EducationType type, Clazz clazz, EducationLevel level) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, avatar, password, facultyID);
        this.courseYear = courseYear;
        this.dateEnrolled = dateEnrolled;
        this.type = type;
        this.level = level;
        this.clazz = clazz;
        this.studentStatus = StudentStatus.STUDYING;
    }
}
