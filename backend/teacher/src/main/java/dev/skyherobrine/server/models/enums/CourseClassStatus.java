package dev.skyherobrine.server.models.enums;

public enum CourseClassStatus {
    PLANNING(1), REGISTERED(2),ACCEPTED(3), LOCKED(4), REJECTED(5);
    private final int value;

    CourseClassStatus(int value) {
        this.value = value;
    }
}
