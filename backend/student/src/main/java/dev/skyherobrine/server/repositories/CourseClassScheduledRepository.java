package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.CourseClass;
import dev.skyherobrine.server.models.CourseClassScheduled;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseClassScheduledRepository extends JpaRepository<CourseClassScheduled,Long> {
    Optional<CourseClassScheduled> findByIdAndGroupPractice(long id, Integer groupPractice);

    List<CourseClassScheduled> findByCourseClassID_SemesterYearAndCourseClassID_FacultyID_FacultyID(String semesterYear, String facultyID);

    Optional<CourseClassScheduled> findByCourseClassIDAndGroupPracticeNull(CourseClass courseClassID);

    Optional<CourseClassScheduled> findByCourseClassIDAndGroupPractice(CourseClass courseClass, Integer groupPractice);
}
