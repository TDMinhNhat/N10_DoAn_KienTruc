package dev.skyherobrine.server.models.enums;

public enum RequiredType {
    STUDY_FIRST(1), PREREQUISITE(2), PARALLEL(3);
    private final int value;

    RequiredType(int value) {
        this.value = value;
    }
}
