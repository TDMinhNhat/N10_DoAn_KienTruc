package dev.skyherobrine.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity @Table(name = "Ministry")
@Getter @Setter @NoArgsConstructor
public class Ministry extends Person{

    public Ministry(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String password, Faculty facultyID) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, password, facultyID);
    }

    public Ministry(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String avatar, String password, Faculty facultyID) {
        super(id, fullName, sex, birthDay, cityBorn, address, phoneNumber, email, avatar, password, facultyID);
    }
}
