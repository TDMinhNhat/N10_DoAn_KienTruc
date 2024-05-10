package dev.skyherobrine.server.models;

import dev.skyherobrine.server.models.enums.RequiredType;
import dev.skyherobrine.server.models.keys.CourseRequiredID;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Table(name = "CourseRequired")
@Getter @Setter @NoArgsConstructor
public class CourseRequired {
    @EmbeddedId
    private CourseRequiredID id;
    @Enumerated(EnumType.STRING) @Column(name = "RequiredType", nullable = false)
    private RequiredType type;
}
