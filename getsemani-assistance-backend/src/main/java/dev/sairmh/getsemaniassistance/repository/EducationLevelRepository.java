package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.EducationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationLevelRepository extends JpaRepository<EducationLevel, Integer> {
}
