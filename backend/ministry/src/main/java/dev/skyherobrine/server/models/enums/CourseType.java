package dev.skyherobrine.server.models.enums;

public enum CourseType {
    REQUIRED(1), OPTION(2);
    private final int value;

    CourseType(int value) {
        this.value = value;
    }
}
