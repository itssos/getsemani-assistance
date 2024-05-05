package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Integer> {
}
