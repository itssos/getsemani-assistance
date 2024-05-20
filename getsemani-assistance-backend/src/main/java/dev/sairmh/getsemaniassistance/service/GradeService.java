package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GradeService {
    @Autowired
    private GradeRepository gradeRepository;

    public Grade getGradeByName(String name){
        return gradeRepository.findByName(name);
    }

    public List<Grade> getAllGrades(){
        return gradeRepository.findAll();
    }

    public Grade create(Grade grade){
        return gradeRepository.save(grade);
    }

    public Grade update(Grade grade){
        Optional<Grade> existingGradeOptional = gradeRepository.findById(grade.getId());
        if(existingGradeOptional.isPresent()){
            Grade existingGrade = existingGradeOptional.get();
            existingGrade.setName(grade.getName());
            return gradeRepository.save(grade);
        }
        return null;
    }

}
