package dev.skyherobrine.server.models.enums;

public enum EducationLevel {
    COLLEGE(1), UNIVERSITY(2), POSTGRADUATE(3);
    private final int value;

    EducationLevel(int value) {
        this.value = value;
    }
}
