package dev.skyherobrine.server.utils;

import com.google.gson.*;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class JsonParserMessage {

    public static String parseToJson(Object src) {
        return new GsonBuilder().serializeNulls()
                .setPrettyPrinting()
                .registerTypeAdapter(LocalDate.class, new JsonSerializer<LocalDate>() {
                    @Override
                    public JsonElement serialize(LocalDate localDate, Type type, JsonSerializationContext jsonSerializationContext) {
                        return new JsonPrimitive(localDate.format(DateTimeFormatter.ISO_LOCAL_DATE));
                    }
                }).create().toJson(src);
    }

    public static Object parseToObject(String message, Type src) {
        return new GsonBuilder().serializeNulls()
                .setPrettyPrinting()
                .registerTypeAdapter(LocalDate.class, new JsonDeserializer<LocalDate>() {
                    @Override
                    public LocalDate deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
                        return LocalDate.parse(jsonElement.getAsString(), DateTimeFormatter.ISO_LOCAL_DATE);
                    }
                }).create().fromJson(message, src);
    }
}
