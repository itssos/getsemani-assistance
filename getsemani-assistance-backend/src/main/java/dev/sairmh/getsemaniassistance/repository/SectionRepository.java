package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {
    Section findByName(String name);
}
