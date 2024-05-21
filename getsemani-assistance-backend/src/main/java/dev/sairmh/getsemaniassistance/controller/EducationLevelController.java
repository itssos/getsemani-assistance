package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.EducationLevel;
import dev.sairmh.getsemaniassistance.service.EducationLevelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/education_level")
public class EducationLevelController {
    @Autowired
    private EducationLevelService educationLevelService;

    @GetMapping("/{id}")
    public ResponseEntity<EducationLevel> getById(@PathVariable int id){
        return ResponseEntity.ok(educationLevelService.getById(id));
    }

    @GetMapping("/name={name}")
    public ResponseEntity<EducationLevel> getByName(@PathVariable String name){
        return ResponseEntity.ok(educationLevelService.getByName(name));
    }

    @GetMapping
    public ResponseEntity<List<EducationLevel>> getAll(){
        return ResponseEntity.ok(educationLevelService.getAll());
    }

}
