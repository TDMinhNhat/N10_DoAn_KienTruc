package dev.skyherobrine.server.repositories;

import dev.skyherobrine.server.models.CourseClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseClassRepository extends JpaRepository<CourseClass,String> {

}
