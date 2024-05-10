package dev.skyherobrine.server.models.enums;

public enum EducationType {
    FORMAL(1), HIGH_QUALITY(2);
    private final int value;

    EducationType(int value) {
        this.value = value;
    }
}
