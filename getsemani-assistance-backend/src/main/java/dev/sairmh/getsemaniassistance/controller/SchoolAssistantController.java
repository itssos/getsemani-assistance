package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.SchoolAssistant;
import dev.sairmh.getsemaniassistance.service.SchoolAssistantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/school-assistant")
public class SchoolAssistantController {
    @Autowired
    private SchoolAssistantService schoolAssistantService;

    @PostMapping
    public ResponseEntity<SchoolAssistant> create(@RequestBody SchoolAssistant schoolAssistant){
        return new ResponseEntity<>(schoolAssistantService.create(schoolAssistant), HttpStatus.CREATED);
    }

}
