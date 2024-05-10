package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,String> {
    Optional<Teacher> findByIdAndPassword(String id, String password);
}
