package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.TeacherStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter @Setter @NoArgsConstructor
public abstract class Person {
    @Id
    @Column(name = "ID", length = 10)
    protected String id;
    @Column(name = "FullName", length = 50, nullable = false)
    protected String fullName;
    @Column(name = "Sex", nullable = false)
    protected boolean sex;
    @Column(name = "BirthDay", nullable = false)
    protected LocalDate birthDay;
    @Column(name = "CityBorn", length = 50, nullable = false)
    protected String cityBorn;
    @Column(name = "Address", length = 100, nullable = false)
    protected String address;
    @Column(name = "PhoneNumber", length = 15, nullable = false)
    protected String phoneNumber;
    @Column(name = "Email", length = 100, nullable = false)
    protected String email;
    @Column(name = "Avatar", length = 100)
    protected String avatar;
    @Column(name = "Password", length = 150, nullable = false)
    protected String password;
    @Column(name = "FacultyID", nullable = false, unique = true)
    protected String facultyID;
    @Column(name = "DateModifier", nullable = false)
    protected LocalDateTime dateModifier;

    public Person(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String password, String facultyID) {
        this.id = id;
        this.fullName = fullName;
        this.sex = sex;
        this.birthDay = birthDay;
        this.cityBorn = cityBorn;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.facultyID = facultyID;
        this.dateModifier = LocalDateTime.now();
    }

    public Person(String id, String fullName, boolean sex, LocalDate birthDay, String cityBorn, String address, String phoneNumber, String email, String avatar, String password, String facultyID) {
        this.id = id;
        this.fullName = fullName;
        this.sex = sex;
        this.birthDay = birthDay;
        this.cityBorn = cityBorn;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.avatar = avatar;
        this.password = password;
        this.facultyID = facultyID;
        this.dateModifier = LocalDateTime.now();
    }
}
