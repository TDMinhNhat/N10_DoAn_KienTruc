package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.CourseClassScheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface CourseClassScheduledRepository extends JpaRepository<CourseClassScheduled,Long> {

    Stream<CourseClassScheduled> findByCourseClassID_CourseClassIdOrderByGroupPracticeAsc(String courseClassId);
}
