package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService {
    @Autowired
    private GradeRepository gradeRepository;

    public List<Grade> getAllGrades(){
        return gradeRepository.findAll();
    }

    public Grade create(Grade grade){
        return gradeRepository.save(grade);
    }

    public Grade getGradeById(Integer id){
        return gradeRepository.findById(id).orElse(null);
    }
    //aquí iría actualizar, agregar dos métodos para ver como funcionaría

    public Grade update(Integer id, Grade updatedGrade){
        Grade existingGrade = gradeRepository.findById(id).orElse(null);
        if(existingGrade != null){
            existingGrade.setName(updatedGrade.getName());
            // Aquí podrías actualizar otros campos si es necesario
            return gradeRepository.save(existingGrade);
        }
        return null; // Retorna null si el grado no existe
    }
    //eliminar Grado
    public void deleteGrade(Integer id){
        gradeRepository.deleteById(id);
    }
}
