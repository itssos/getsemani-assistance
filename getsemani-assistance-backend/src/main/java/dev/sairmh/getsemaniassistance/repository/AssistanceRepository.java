package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Assistance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssistanceRepository extends JpaRepository<Assistance, Integer> {
}
