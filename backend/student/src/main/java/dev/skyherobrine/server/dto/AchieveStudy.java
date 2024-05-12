package dev.skyherobrine.server.dto;

import lombok.*;

@Data
public class AchieveStudy {
    private int semester;
    private String semesterYear;
    private String courseClassID;
    private String courseName;
    private int credits;
    private double middleExam;
    private double rs1, rs2, rs3;
    private double ps1, ps2, ps3;
    private double finalExam;
    private double average;
    private double averageFollow4;
    private String scoreLetter;
    private String ranks;

    public AchieveStudy(int semester, String semesterYear, String courseClassID, String courseName, int credits, double middleExam, double rs1, double rs2, double rs3, double ps1, double ps2, double ps3, double finalExam, double average, double averageFollow4, String scoreLetter, String ranks) {
        this.semester = semester;
        this.semesterYear = semesterYear;
        this.courseClassID = courseClassID;
        this.courseName = courseName;
        this.credits = credits;
        this.middleExam = middleExam;
        this.rs1 = rs1;
        this.rs2 = rs2;
        this.rs3 = rs3;
        this.ps1 = ps1;
        this.ps2 = ps2;
        this.ps3 = ps3;
        this.finalExam = finalExam;
        this.average = average;
        this.averageFollow4 = averageFollow4;
        this.scoreLetter = scoreLetter;
        this.ranks = ranks;
    }
}
