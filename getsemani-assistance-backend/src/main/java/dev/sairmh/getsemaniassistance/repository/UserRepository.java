package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
