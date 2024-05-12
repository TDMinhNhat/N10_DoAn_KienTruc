package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepositories extends JpaRepository<Student, String> {
}
