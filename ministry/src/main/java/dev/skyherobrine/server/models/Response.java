package dev.skyherobrine.server.models;

import lombok.Data;

import java.util.Map;

@Data
public class Response {

    private int status;
    private String message;
    private Map<String,Object> data;

    public Response(int status, String message, Map<String,Object> data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
