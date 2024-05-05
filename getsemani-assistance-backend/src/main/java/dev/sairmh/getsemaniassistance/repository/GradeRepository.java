package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer> {
}
