package dev.skyherobrine.server.models;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "Department")
@Getter @Setter @NoArgsConstructor
public class Department {
    @Id @Column(name = "DepartmentID", length = 10)
    private String departmentId;
    @Column(name = "DepartmentName", length = 50, unique = true, nullable = false)
    private String departmentName;
    @Column(name = "Description", length = 200)
    private String description;

    public Department(String departmentId, String departmentName) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    public Department(String departmentId, String departmentName, String description) {
        this.departmentId = departmentId;
        this.departmentName = departmentName;
        this.description = description;
    }
}
