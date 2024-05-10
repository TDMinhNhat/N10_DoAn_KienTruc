package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student,String> {
    Optional<Student> findByIdAndPassword(String id, String password);
}
