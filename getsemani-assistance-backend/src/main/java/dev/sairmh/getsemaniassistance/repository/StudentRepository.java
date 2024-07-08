package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.EducationLevel;
import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.model.Section;
import dev.sairmh.getsemaniassistance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, String>{
    Student findByDni(String dni);
    List<Student> findByGrade(Grade grade);
    List<Student> findBySection(Section section);
    List<Student> findByEducationLevel(EducationLevel educationLevel);
    List<Student> findByGradeAndSection(Grade grade, Section section);
    List<Student> findByEducationLevelAndGradeAndSection(EducationLevel educationLevel, Grade grade, Section section);
}
