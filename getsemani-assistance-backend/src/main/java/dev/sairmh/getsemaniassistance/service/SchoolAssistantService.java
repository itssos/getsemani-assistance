package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.SchoolAssistant;
import dev.sairmh.getsemaniassistance.repository.SchoolAssistantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class SchoolAssistantService {
    @Autowired
    private SchoolAssistantRepository schoolAssistantRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public SchoolAssistant create(SchoolAssistant schoolAssistant){
        String encryptedPassword = passwordEncoder.encode(schoolAssistant.getPassword());
        schoolAssistant.setPassword(encryptedPassword);
        return schoolAssistantRepository.save(schoolAssistant);
    }

}
