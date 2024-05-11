package dev.skyherobrine.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity @Table(name = "EnrollCourse")
@Getter @Setter @NoArgsConstructor
public class EnrollCourse {
    @Id @Column(name = "EnrollCourseID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "DateEnrolled", nullable = false)
    private LocalDateTime dateEnrolled;
    @ManyToOne @JoinColumn(name = "StudentID", nullable = false)
    private Student student;
    @ManyToOne @JoinColumn(name = "CourseClassScheduled", nullable = false)
    private CourseClassScheduled ccsID;
    @Column(name = "RS1")
    private Double rs1;
    @Column(name = "RS2")
    private Double rs2;
    @Column(name = "RS3")
    private Double rs3;
    @Column(name = "PS1")
    private Double ps1;
    @Column(name = "PS2")
    private Double ps2;
    @Column(name = "PS3")
    private Double ps3;
    @Column(name = "MiddleExam")
    private Double middleExam;
    @Column(name = "FinalExam")
    private Double finalExam;
    @Column(name = "Average")
    private Double average;
    @Column(name = "DateModifier")
    private LocalDateTime dateModifier;

    public EnrollCourse(long id, LocalDateTime dateEnrolled, Student student, CourseClassScheduled ccsID) {
        this.id = id;
        this.dateEnrolled = dateEnrolled;
        this.student = student;
        this.ccsID = ccsID;
        this.dateModifier = LocalDateTime.now();
    }

    public EnrollCourse(long id, LocalDateTime dateEnrolled, Student student, CourseClassScheduled ccsID, double rs1, double rs2, double rs3, double ps1, double ps2, double ps3, double middleExam, double finalExam, double average) {
        this.id = id;
        this.dateEnrolled = dateEnrolled;
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
        this.dateModifier = LocalDateTime.now();
    }

    public void setAverage() {
        this.average = calcAverage();
    }

    public double calcAverage() {
        int divide = 0;
        double sum = 0.0;
        if(rs1 != null) {
            sum += rs1;
            ++divide;
        }
        if(rs2 != null) {
            sum += rs2;
            ++divide;
        }
        if(rs3 != null) {
            sum += rs3;
            ++divide;
        }
        if(ps1 != null) {
            sum += ps1;
            ++divide;
        }
        if(ps2 != null) {
            sum += ps2;
            ++divide;
        }
        if(ps3 != null) {
            sum += ps3;
            ++divide;
        }
        sum += (middleExam + finalExam);
        divide += (2 + 3);
        return Math.round((sum / divide) * 10.0) / 10.0;
    }

    public double getScoreFollow4() {
        String letter = scoreLetter();
        switch(letter) {
            case "A+":
                return 4.0;
            case "A":
                return 3.8;
            case "B+":
                return 3.5;
            case "B":
                return 3.0;
            case "C+":
                return 2.5;
            case "C":
                return 2.0;
            case "D+":
                return 1.5;
            case "D":
                return 1.0;
            default:
                return 0.0;
        }
    }

    public String scoreLetter() {
        if(average >= 9.0 && average <= 10.0) {
            return "A+";
        } else if(average >= 8.5 && average <= 8.9) {
            return "A";
        } else if(average >= 8.0 && average <= 8.4) {
            return "B+";
        } else if(average >= 7.0 && average <= 7.9) {
            return "B";
        } else if(average >= 6.0 && average <= 6.9) {
            return "C+";
        } else if(average >= 5.5 && average <= 5.9) {
            return "C";
        } else if(average >= 5.0 && average <= 5.4) {
            return "D+";
        } else if(average >= 4.0 && average <= 4.9) {
            return "D";
        } else {
            return "F";
        }
    }

    public String getRanks() {
        String scoreLetter = scoreLetter();
        switch (scoreLetter) {
            case "A+" -> {
                return "Xuất xắc";
            }
            case "A" -> {
                return "Giỏi";
            }
            case "B+" -> {
                return "Khá";
            }
            case "B" -> {
                return "Khá";
            }
            case "C+" -> {
                return "Trung bình khá";
            }
            case "C" -> {
                return "Trung bình";
            }
            case "D+" -> {
                return "Trung bình yếu";
            }
            case "D" -> {
                return "Yếu";
            }
            default -> {
                return "Kém";
            }
        }
    }
}
