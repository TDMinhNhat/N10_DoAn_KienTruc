package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.EnrollCourse;
import dev.skyherobrine.server.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollCourseRepository extends JpaRepository<EnrollCourse,Long> {

    List<EnrollCourse> findByStudent_IdOrderByCcsID_CourseClassID_SemesterYearAsc(String id);

    List<EnrollCourse> findByStudent(Student student);
}
