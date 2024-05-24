package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.EnrollCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollCourseRepository extends JpaRepository<EnrollCourse,Long> {
    List<EnrollCourse> findByCcsID_IdAndCcsID_GroupPracticeNull(long id);

    Optional<EnrollCourse> findByStudent_IdAndCcsID_IdAndCcsID_GroupPracticeNull(String id, long id1);
}
