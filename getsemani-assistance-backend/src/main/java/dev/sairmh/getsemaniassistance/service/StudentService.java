package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.exception.ResourceNotFoundException;
import dev.sairmh.getsemaniassistance.model.Student;
import dev.sairmh.getsemaniassistance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(int id){
        return studentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public Student create(Student student){
        return studentRepository.save(student);
    }
}
