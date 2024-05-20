package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.model.Section;
import dev.sairmh.getsemaniassistance.model.Student;
import dev.sairmh.getsemaniassistance.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
@Validated
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private Validator validator;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(){
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable String studentId){
        return ResponseEntity.ok(studentService.getStudentById(studentId));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{grade}/{section}")
    public ResponseEntity<List<Student>> getStudentById(@PathVariable String grade, @PathVariable String section){
        return ResponseEntity.ok(studentService.getStudentsByGradeAndSection(grade, section));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Student> create(@Valid @RequestBody Student student){
        return new ResponseEntity<>(studentService.create(student), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/batch")
    public ResponseEntity<List<Student>> createBatch(@Valid @RequestBody List<Student> students) {
        return new ResponseEntity<>(studentService.createBatch(students), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update")
    public ResponseEntity<Student> update(@Valid @RequestBody Student student){
        return ResponseEntity.ok(studentService.update(student));
    }

}
