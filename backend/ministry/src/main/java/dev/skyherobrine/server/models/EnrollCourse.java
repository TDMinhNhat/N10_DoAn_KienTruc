package dev.skyherobrine.server.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity @Table(name = "EnrollCourse")
@Getter @Setter @NoArgsConstructor
public class EnrollCourse {
    @Id @Column(name = "EnrollCourseID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "DateEnrolled", nullable = false)
    private LocalDate dateEnrolled;
    @ManyToOne @JoinColumn(name = "StudentID", nullable = false)
    private Student student;
    @ManyToOne @JoinColumn(name = "CourseClassScheduled", nullable = false)
    private CourseClassScheduled ccsID;
    @Column(name = "RS1")
    private double rs1;
    @Column(name = "RS2")
    private double rs2;
    @Column(name = "RS3")
    private double rs3;
    @Column(name = "PS1")
    private double ps1;
    @Column(name = "PS2")
    private double ps2;
    @Column(name = "PS3")
    private double ps3;
    @Column(name = "MiddleExam")
    private double middleExam;
    @Column(name = "FinalExam")
    private double finalExam;
    @Column(name = "Average")
    private double average;

    public EnrollCourse(Student student, CourseClassScheduled ccsID) {
        dateEnrolled = LocalDate.now();
        this.student = student;
        this.ccsID = ccsID;
    }

    public EnrollCourse(Student student, CourseClassScheduled ccsID, double rs1, double rs2, double rs3, double ps1, double ps2, double ps3, double middleExam, double finalExam, double average) {
        this.student = student;
        this.ccsID = ccsID;
        this.rs1 = rs1;
        this.rs2 = rs2;
        this.rs3 = rs3;
        this.ps1 = ps1;
        this.ps2 = ps2;
        this.ps3 = ps3;
        this.middleExam = middleExam;
        this.finalExam = finalExam;
        this.average = average;
    }
}
