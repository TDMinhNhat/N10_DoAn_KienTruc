package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.CourseClassScheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseClassScheduledRepository extends JpaRepository<CourseClassScheduled,Long> {
}
