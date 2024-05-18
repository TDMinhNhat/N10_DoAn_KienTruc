package dev.skyherobrine.server.message.get;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import dev.skyherobrine.server.models.Ministry;
import dev.skyherobrine.server.repositories.MinistryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class MinistryUpdateConsumer {

    @Autowired
    private MinistryRepository mr;

    private LocalDate convertStringToDate(String date) {
        String[] splitDate = date.split("-");
        return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
    }

    @KafkaListener(topics = "update_ministry", groupId = "authenticate_ministry")
    public void updateMinistry(String message) {
        JsonObject object = JsonParser.parseString(message).getAsJsonObject();
        Ministry ministry = new Ministry(
                object.get("id").getAsString(),
                object.get("fullName").getAsString(),
                object.get("sex").getAsBoolean(),
                convertStringToDate(object.get("birthDay").getAsString()),
                object.get("cityBorn").getAsString(),
                object.get("address").getAsString(),
                object.get("phoneNumber").getAsString(),
                object.get("email").getAsString(),
                object.get("avatar").getAsString(),
                object.get("password").getAsString(),
                object.get("facultyID").getAsJsonObject().get("facultyID").getAsString()
        );
        mr.save(ministry);
    }
}
