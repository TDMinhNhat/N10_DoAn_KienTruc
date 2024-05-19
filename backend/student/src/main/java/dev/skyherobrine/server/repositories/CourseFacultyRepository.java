package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.CourseFaculty;
import dev.skyherobrine.server.models.keys.CourseFacultyID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseFacultyRepository extends JpaRepository<CourseFaculty, CourseFacultyID> {

    List<CourseFaculty> findById_Faculty_FacultyID(String facultyID);
}
