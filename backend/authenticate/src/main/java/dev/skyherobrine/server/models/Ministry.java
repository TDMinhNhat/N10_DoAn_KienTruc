package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.TeacherStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity @Table(name = "Ministry")
@Getter @Setter @NoArgsConstructor
public class Ministry extends Person{

    public Ministry(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String password, String facultyID) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, password, facultyID);
    }

    public Ministry(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String avatar, String password, String facultyID) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, avatar, password, facultyID);
    }
}
