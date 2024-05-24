package dev.skyherobrine.server.dto;

import lombok.Data;

@Data
public class InputScoreStudentDTO {
    private String studentID;
    private long courseClassScheduledID;
    private double middleExam;
    private double rs1, rs2, rs3;
    private double ps1, ps2, ps3;
    private double finalExam;

    public InputScoreStudentDTO(String studentID, long courseClassScheduledID, double middleExam, double rs1, double rs2, double rs3, double ps1, double ps2, double ps3, double finalExam) {
        this.studentID = studentID;
        this.courseClassScheduledID = courseClassScheduledID;
        this.middleExam = middleExam;
        this.rs1 = rs1;
        this.rs2 = rs2;
        this.rs3 = rs3;
        this.ps1 = ps1;
        this.ps2 = ps2;
        this.ps3 = ps3;
        this.finalExam = finalExam;
    }
}
