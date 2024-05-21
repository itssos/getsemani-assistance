package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.repository.AssistanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssistanceService {
    @Autowired
    private AssistanceRepository assistanceRepository;

    public List<Assistance> getAllAssistance(){
        return assistanceRepository.findAll();
    }

//    public Assistance create(Assistance assistance){
//        return assistanceRepository.save(assistance);
//    }

    public Assistance create(Assistance assistance) {
        List<Assistance> assistancesStudent = assistanceRepository.findByStudent(assistance.getStudent());

        Optional<Assistance> existingAssistance = assistancesStudent.stream()
                .filter(a -> a.getDate().toLocalDate().equals(assistance.getDate().toLocalDate()))
                .findFirst();

        if (existingAssistance.isPresent()) {
            // ----------- LOGICA DE REGISTRO DE SALIDA
            Assistance prevAssistance = existingAssistance.get();
//            if (prevAssistance.getState().equals("ASISTIO") || prevAssistance.getState().equals("TARDANZA")) {
//                LocalTime limitTime = LocalTime.of(14, 0); // Hora límite a las 2:00 PM
//                if (assistance.getDate().toLocalTime().isAfter(limitTime)) {
//                    prevAssistance.setState("SALIDA");
//                    return assistanceRepository.save(prevAssistance);
//                }
//                return null;
//            } else {
//                return null;
//            }
            return prevAssistance;
        } else {
            LocalTime time = assistance.getDate().toLocalTime();
            if (time.isBefore(LocalTime.of(13, 22))) {
                assistance.setState("ASISTIO");
            } else if (time.isBefore(LocalTime.of(13, 25))) {
                assistance.setState("TARDANZA");
            } else {
                assistance.setState("FALTO");
            }
            return assistanceRepository.save(assistance);
        }
    }

}
