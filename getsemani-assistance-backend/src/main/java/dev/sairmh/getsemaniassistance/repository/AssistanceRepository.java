package dev.sairmh.getsemaniassistance.repository;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AssistanceRepository extends JpaRepository<Assistance, Integer> {
    List<Assistance> findByStudent(Student student);

    List<Assistance> findByStudent_Grade_NameAndStudent_Section_NameAndDateBetween(
            String gradeName, String sectionName, LocalDateTime startDate, LocalDateTime endDate);

    List<Assistance> findByStudent_Grade_NameAndStudent_Section_NameAndDateBetweenAndState(
            String gradeName, String sectionName, LocalDateTime startDate, LocalDateTime endDate, String state);



    @Query("SELECT CONCAT(s.name, ' ', s.surname) AS full_name, " +
            "g.name AS grade_name, " +
            "sec.name AS section_name, " +
            "el.name AS education_level_name, " +
            "COUNT(a.state) AS tardiness_count " +
            "FROM Assistance a " +
            "JOIN a.student s " +
            "JOIN s.grade g " +
            "JOIN s.section sec " +
            "JOIN s.educationLevel el " +
            "WHERE a.state = 'TARDANZA' " +
            "GROUP BY s.id, s.name, s.surname, g.name, sec.name, el.name " +
            "ORDER BY tardiness_count DESC")
    List<Object[]> findStudentsWithTardiness();

    @Query("SELECT CONCAT(u.name, ' ', u.surname), COUNT(*) AS total_assistances " +
                  "FROM Assistance a " +
                  "INNER JOIN User u ON a.user.id = u.id " +
                  "GROUP BY u.id " +
                  "ORDER BY total_assistances DESC")
    List<Object[]> findAssistancesByUser();

    @Query("SELECT " +
            "SUM(CASE WHEN a.state = 'TARDANZA' THEN 1 ELSE 0 END) AS tardanzaCount, " +
            "SUM(CASE WHEN a.state = 'ASISTIO' THEN 1 ELSE 0 END) AS asistioCount, " +
            "SUM(CASE WHEN a.state = 'FALTO' THEN 1 ELSE 0 END) AS faltoCount " +
            "FROM Assistance a")
    List<Object[]> countAssistanceStates();
    @Query(nativeQuery = true, value = "SELECT " +
            "   concat(g.name ,' ',e.name ,' ',s.name),"+
            "    COUNT(a.id) AS total_tardanzas " +
            "FROM " +
            "    getsemani_assistance.assistance a " +
            "INNER JOIN " +
            "    getsemani_assistance.student st ON a.id_student = st.id " +
            "INNER JOIN " +
            "    getsemani_assistance.grade g ON st.id_grade = g.id " +
            "INNER JOIN " +
            "    getsemani_assistance.section s ON st.id_section = s.id " +
            "INNER JOIN " +
            "    getsemani_assistance.education_level e ON st.id_education_level = e.id " +
            "WHERE " +
            "    a.state = 'TARDANZA' " +
            "GROUP BY " +
            "    g.name, " +
            "    s.name, " +
            "    e.name " +
            "ORDER BY " +
            "    total_tardanzas DESC "+
            "LIMIT 10")
    List<Object[]> findTardinessCounts();
}

