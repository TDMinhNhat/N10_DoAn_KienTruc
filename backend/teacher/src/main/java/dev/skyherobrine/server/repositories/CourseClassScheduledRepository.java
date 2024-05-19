package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.CourseClassScheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseClassScheduledRepository extends JpaRepository<CourseClassScheduled,Long> {
    List<CourseClassScheduled> findByCourseClassID_SemesterYearAndGroupPracticeNull(String semesterYear);

    List<CourseClassScheduled> findByTeacherId_Id(String id);
}
