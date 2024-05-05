package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Section;
import dev.sairmh.getsemaniassistance.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {
    @Autowired
    private SectionRepository sectionRepository;

    public List<Section> getAllSections(){
        return sectionRepository.findAll();
    }

    public Section create(Section section){
        return sectionRepository.save(section);
    }

}
