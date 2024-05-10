package dev.skyherobrine.server.models.enums;

public enum TeacherLevel {
    BACHELOR(1), MASTER(2), DOCTOR(3), PROFESSOR(4);
    private final int value;
    TeacherLevel(int value) {
        this.value = value;
    }
}
