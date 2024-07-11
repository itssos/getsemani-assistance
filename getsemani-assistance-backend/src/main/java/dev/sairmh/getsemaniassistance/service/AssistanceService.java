package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.repository.AssistanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssistanceService {
    @Autowired
    private AssistanceRepository assistanceRepository;

    public List<Assistance> getAllAssistance() {
        return assistanceRepository.findAll();
    }

    public List<Assistance> getFilteredAssistances(String educationName, String gradeName, String sectionName, LocalDateTime startDate, LocalDateTime endDate) {
        return assistanceRepository.findByStudent_EducationLevel_NameAndStudent_Grade_NameAndStudent_Section_NameAndDateBetween(
                educationName, gradeName, sectionName, startDate, endDate);
    }

    public List<Assistance> getAssistancesByState(String educationName, String gradeName, String sectionName, LocalDateTime startDate, LocalDateTime endDate, String state) {
        return assistanceRepository.findByStudent_EducationLevel_NameAndStudent_Grade_NameAndStudent_Section_NameAndDateBetweenAndState(
                educationName, gradeName, sectionName, startDate, endDate, state);
    }

    public Assistance create(Assistance assistance) {
        List<Assistance> assistancesStudent = assistanceRepository.findByStudent(assistance.getStudent());

        Optional<Assistance> existingAssistance = assistancesStudent.stream()
                .filter(a -> a.getDate().toLocalDate().equals(assistance.getDate().toLocalDate()))
                .findFirst();

        if (existingAssistance.isPresent()) {
            // ----------- LOGICA DE REGISTRO DE SALIDA
            Assistance prevAssistance = existingAssistance.get();
            return prevAssistance;
        } else {
            LocalTime time = assistance.getDate().toLocalTime();
            if (time.isAfter(LocalTime.of(1, 0)) && time.isBefore(LocalTime.of(21, 0))) {
                assistance.setState("ASISTIO");
            } else if (time.isAfter(LocalTime.of(21, 1)) && time.isBefore(LocalTime.of(21, 10))) {
                assistance.setState("TARDANZA");
            } else if (time.isAfter(LocalTime.of(21, 11))) {
                assistance.setState("FALTO");
            } else {
                return null;
            }
            System.out.println(assistance.toString());
            return assistanceRepository.save(assistance);
        }
    }
    public List<Object[]> findStudentsWithTardiness() {
        return assistanceRepository.findStudentsWithTardiness();
    }
    public List<Object[]> getAssistancesByUser() {
        return assistanceRepository.findAssistancesByUser();
    }
    public List<Object[]> countAssistanceStates() {
        return assistanceRepository.countAssistanceStates();
    }
    public List<Object[]> findTardinessCounts() {
        return assistanceRepository.findTardinessCounts();
    }
}
