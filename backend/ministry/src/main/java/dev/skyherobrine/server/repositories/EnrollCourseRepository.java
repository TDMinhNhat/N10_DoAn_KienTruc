package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.EnrollCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrollCourseRepository extends JpaRepository<EnrollCourse,Long> {
}
