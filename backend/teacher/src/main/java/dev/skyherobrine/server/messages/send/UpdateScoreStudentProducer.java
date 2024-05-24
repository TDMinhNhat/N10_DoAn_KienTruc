package dev.skyherobrine.server.messages.send;

import dev.skyherobrine.server.utils.JsonParserMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class UpdateScoreStudentProducer {

    @Autowired
    private KafkaTemplate<String,String> template;

    public void sendUpdateScoreStudent(String message) {
        template.send("update_score_student", JsonParserMessage.parseToJson(message));
    }
}
