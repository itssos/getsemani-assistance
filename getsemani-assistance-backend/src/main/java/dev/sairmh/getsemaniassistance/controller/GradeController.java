package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Grade;
import dev.sairmh.getsemaniassistance.service.GradeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/grade")
public class GradeController {
    @Autowired
    private GradeService gradeService;

    @GetMapping
    public ResponseEntity<List<Grade>> getAllGrades(){
        return ResponseEntity.ok(gradeService.getAllGrades());
    }

    @PostMapping
    public ResponseEntity<Grade> create(@Valid @RequestBody Grade grade){
        System.out.println("AQUI ESTA EL GRADE: "+grade);
        return new ResponseEntity<>(gradeService.create(grade), HttpStatus.CREATED);
    }
//    @PostMapping
//    public void create(@RequestBody Grade grade){
//        System.out.println("AQUI ESTA EL GRADE: "+grade.getName());
//    }
}