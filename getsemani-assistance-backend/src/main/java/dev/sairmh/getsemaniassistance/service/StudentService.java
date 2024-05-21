package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.exception.ResourceNotFoundException;
import dev.sairmh.getsemaniassistance.exception.StudentNotFoundException;
import dev.sairmh.getsemaniassistance.model.EducationLevel;
import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.model.Section;
import dev.sairmh.getsemaniassistance.model.Student;
import dev.sairmh.getsemaniassistance.repository.EducationLevelRepository;
import dev.sairmh.getsemaniassistance.repository.GradeRepository;
import dev.sairmh.getsemaniassistance.repository.SectionRepository;
import dev.sairmh.getsemaniassistance.repository.StudentRepository;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private GradeRepository gradeRepository;
    @Autowired
    private SectionRepository sectionRepository;
    @Autowired
    private EducationLevelRepository educationLevelRepository;
    @Autowired
    private Validator validator;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(String id){
        return studentRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
    }

    public List<Student> getStudentsByGradeAndSection(String grade, String section) {
        Grade g = gradeRepository.findByName(grade);
        Section s = sectionRepository.findByName(section);
        return studentRepository.findByGradeAndSection(g,s);
    }

    public List<Student> getStudentsByEducationLevelAndGradeAndSection(String educationLevel, String grade, String section) {
        EducationLevel e = educationLevelRepository.findByName(educationLevel);
        Grade g = gradeRepository.findByName(grade);
        Section s = sectionRepository.findByName(section);
        return studentRepository.findByEducationLevelAndGradeAndSection(e,g,s);
    }

    public Student create(Student student){
        return studentRepository.save(student);
    }
    public List<Student> createBatch(List<Student> students) {
        return studentRepository.saveAll(students);
    }

    public Student update(Student student){
        Optional<Student> existingStudentOptional = studentRepository.findById(student.getId());

        if (existingStudentOptional.isPresent()) {
            Student existingStudent = existingStudentOptional.get();

            existingStudent.setName(student.getName());
            existingStudent.setSurname(student.getSurname());
            existingStudent.setDni(student.getDni());
            existingStudent.setGrade(student.getGrade());
            existingStudent.setSection(student.getSection());
            existingStudent.setEducationLevel(student.getEducationLevel());
            existingStudent.setState(student.getState());

            return studentRepository.save(existingStudent);
        } else {
            throw new StudentNotFoundException(student.getId());
        }
    }


}
