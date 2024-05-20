package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Section;
import dev.sairmh.getsemaniassistance.service.SectionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/section")
public class SectionController {
    @Autowired
    private SectionService sectionService;

    @GetMapping
    public ResponseEntity<List<Section>> getAllGrades(){
        return ResponseEntity.ok(sectionService.getAllSections());
    }

    @PostMapping
    public ResponseEntity<Section> create(@Valid @RequestBody Section section){
        return new ResponseEntity<>(sectionService.create(section), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Section> update(@Valid @RequestBody Section section){
        return ResponseEntity.ok(sectionService.update(section));
    }
}
