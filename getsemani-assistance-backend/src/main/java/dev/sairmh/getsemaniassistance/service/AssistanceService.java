package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.repository.AssistanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AssistanceService {
    @Autowired
    private AssistanceRepository assistanceRepository;

    public List<Assistance> getAllAssistance(){
        return assistanceRepository.findAll();

    }

    public List<Assistance> getFilteredAssistances(String gradeName, String sectionName, int day, int month) {
        LocalDateTime startOfDay = LocalDateTime.now().withDayOfMonth(day).withMonth(month).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = startOfDay.withHour(23).withMinute(59).withSecond(59);

        return assistanceRepository.findByStudent_Grade_NameAndStudent_Section_NameAndDateBetween(
                gradeName, sectionName, startOfDay, endOfDay);
    }

    public List<Assistance> getAssistancesByState(String gradeName, String sectionName, int day, int month, String state) {
        LocalDateTime startOfDay = LocalDateTime.now().withDayOfMonth(day).withMonth(month).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = startOfDay.withHour(23).withMinute(59).withSecond(59);

        return assistanceRepository.findByStudent_Grade_NameAndStudent_Section_NameAndDateBetweenAndState(
                gradeName, sectionName, startOfDay, endOfDay, state);
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
            if (time.isAfter(LocalTime.of(7,0)) && time.isBefore(LocalTime.of(21, 00))) {
                assistance.setState("ASISTIO");
            } else if (time.isAfter(LocalTime.of(21,1)) && time.isBefore(LocalTime.of(21, 10))) {
                assistance.setState("TARDANZA");
            } else if (time.isAfter(LocalTime.of(21,11))) {
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
