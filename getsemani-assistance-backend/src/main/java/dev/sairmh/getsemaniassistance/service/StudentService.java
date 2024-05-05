package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.exception.ResourceNotFoundException;
import dev.sairmh.getsemaniassistance.model.Student;
import dev.sairmh.getsemaniassistance.repository.StudentRepository;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private Validator validator;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id){
        return studentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public List<Student> getStudentsByGradeAndSection(String grade, String section) {
        return studentRepository.findByGradeAndSection(grade,section);
    }

    public Student create(Student student){
        return studentRepository.save(student);
    }
    public List<Student> createBatch(List<Student> students) {
        return studentRepository.saveAll(students);
    }


}
