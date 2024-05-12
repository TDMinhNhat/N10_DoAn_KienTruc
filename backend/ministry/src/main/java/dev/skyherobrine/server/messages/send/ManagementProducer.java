package dev.skyherobrine.server.messages.send;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ManagementProducer {

    @Autowired
    private KafkaTemplate<String,String> template;

    public void sendManagementMessage(String nameObject, String message) {
        template.send(nameObject, message);
    }
}
