package dev.skyherobrine.server.models.enums;

public enum StudentStatus {
    STUDYING(1), RESERVE(2), EXPULSION(4), GRADUATED(5);
    private final int status;

    StudentStatus(int status) {
        this.status = status;
    }
}
