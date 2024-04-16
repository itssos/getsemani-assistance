package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.repository.AssistanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssistanceService {
    @Autowired
    private AssistanceRepository assistanceRepository;

    public List<Assistance> getAllAssistance(){
        return assistanceRepository.findAll();
    }

    public Assistance create(Assistance assistance){
        return assistanceRepository.save(assistance);
    }

}
