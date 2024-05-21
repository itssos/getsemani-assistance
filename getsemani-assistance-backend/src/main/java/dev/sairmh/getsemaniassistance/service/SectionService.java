package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Section;
import dev.sairmh.getsemaniassistance.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SectionService {
    @Autowired
    private SectionRepository sectionRepository;

    public List<Section> getAllSections(){
        return sectionRepository.findAll();
    }

    public Section getById(int id){
        return sectionRepository.findById(id).orElse(null);
    }

    public Section getByName(String name){
        return sectionRepository.findByName(name);
    }

    public Section create(Section section){
        return sectionRepository.save(section);
    }

    public Section update(Section section){
        Optional<Section> existingSectionOptional = sectionRepository.findById(section.getId());
        if(existingSectionOptional.isPresent()){
            Section existingGrade = existingSectionOptional.get();
            existingGrade.setName(section.getName());
            return sectionRepository.save(section);
        }
        return null;
    }

}
