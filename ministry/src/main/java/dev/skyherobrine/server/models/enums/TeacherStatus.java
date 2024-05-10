package dev.skyherobrine.server.models.enums;

public enum TeacherStatus {
    ACTIVE(1), HIBERNATE(2), DELETED(3);
    private final int value;

    TeacherStatus(int value) {
        this.value = value;
    }
}
