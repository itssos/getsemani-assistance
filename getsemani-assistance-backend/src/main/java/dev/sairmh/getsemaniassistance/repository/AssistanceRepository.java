package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AssistanceRepository extends JpaRepository<Assistance, Integer> {
    List<Assistance> findByStudent(Student student);

    List<Assistance> findByStudent_Grade_NameAndStudent_Section_NameAndDateBetween(
            String gradeName, String sectionName, LocalDateTime startDate, LocalDateTime endDate);

    List<Assistance> findByStudent_Grade_NameAndStudent_Section_NameAndDateBetweenAndState(
            String gradeName, String sectionName, LocalDateTime startDate, LocalDateTime endDate, String state);

}
