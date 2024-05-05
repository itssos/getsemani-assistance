package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String>{
    //List<Student> findByGradeAndSection(String grade, String section);
}
