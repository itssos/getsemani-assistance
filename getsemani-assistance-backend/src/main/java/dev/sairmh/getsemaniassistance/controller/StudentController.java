package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Student;
import dev.sairmh.getsemaniassistance.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@Validated
public class StudentController {
    @Autowired
    private StudentService studentService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(){
        return ResponseEntity.ok(studentService.getAllStudents());
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable int studentId){
        return ResponseEntity.ok(studentService.getStudentById(studentId));
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Student> create(@Valid @RequestBody Student student){
        return new ResponseEntity<>(studentService.create(student), HttpStatus.CREATED);
    }

}
