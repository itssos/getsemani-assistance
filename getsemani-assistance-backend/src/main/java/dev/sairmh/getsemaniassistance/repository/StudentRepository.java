package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
