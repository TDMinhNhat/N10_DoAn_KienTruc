package dev.skyherobrine.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity @Table(name = "CourseClassScheduled")
@Getter @Setter @NoArgsConstructor
public class CourseClassScheduled {
    @Id @Column(name = "ScheduledID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "Room", length = 100, nullable = false)
    private String room;
    @Column(name = "FromLessonTime", nullable = false)
    private int fromLessonTime;
    @Column(name = "ToLessonTime", nullable = false)
    private int toLessonTime;
    @Column(name = "FromDate", nullable = false)
    private LocalDate fromDate;
    @Column(name = "ToDate", nullable = false)
    private LocalDate toDate;
    @Column(name = "GroupPractice")
    private Integer groupPractice;
    @Column(name = "MaxStudents", nullable = false)
    private int maxStudents;
    @Column(name = "TeacherID", length = 10, nullable = false)
    private String teacherId;
    @ManyToOne @JoinColumn(name = "CourseClassID", nullable = false)
    private CourseClass courseClassID;
    @Column(name = "DayOfWeek", nullable = false)
    private int dayOfWeek;

    public CourseClassScheduled(String room, int fromLessonTime, int toLessonTime, LocalDate fromDate, LocalDate toDate, Integer groupPractice, int maxStudents, String teacherId, CourseClass courseClassID, int dayOfWeek) {
        this.room = room;
        this.fromLessonTime = fromLessonTime;
        this.toLessonTime = toLessonTime;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.groupPractice = groupPractice;
        this.maxStudents = maxStudents;
        this.teacherId = teacherId;
        this.courseClassID = courseClassID;
        this.dayOfWeek = dayOfWeek;
    }
}
