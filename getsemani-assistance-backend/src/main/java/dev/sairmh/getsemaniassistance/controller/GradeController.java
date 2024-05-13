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

    @GetMapping("/{id}")
    public ResponseEntity<Grade> getGradeById(@PathVariable Integer id){
        Grade grade = gradeService.getGradeById(id);
        if (grade != null){
            return ResponseEntity.ok(grade);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Grade> updateGrade(@PathVariable Integer id, @Valid @RequestBody Grade updatedGrade){
        Grade grade = gradeService.update(id, updatedGrade);
        if(grade != null){
            return ResponseEntity.ok(grade);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Integer id){
        gradeService.deleteGrade(id);
        return ResponseEntity.noContent().build();
    }
}
