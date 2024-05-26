package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher,String> {
    List<Teacher> findByFacultyID_FacultyID(String facultyID);

}
