package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.SchoolAssistant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolAssistantRepository extends JpaRepository<SchoolAssistant, String> {
}
