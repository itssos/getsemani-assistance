package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.EducationLevel;
import dev.sairmh.getsemaniassistance.repository.EducationLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationLevelService {
    @Autowired
    private EducationLevelRepository educationLevelRepository;

    public EducationLevel getById(int id){
        return educationLevelRepository.findById(id).orElse(null);
    }

    public EducationLevel getByName(String name){
        return educationLevelRepository.findByName(name);
    }

    public List<EducationLevel> getAll(){
        return educationLevelRepository.findAll();
    }

}
