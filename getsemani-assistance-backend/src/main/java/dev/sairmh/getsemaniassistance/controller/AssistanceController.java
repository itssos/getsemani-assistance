package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.service.AssistanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assistance")
public class AssistanceController {
    @Autowired
    private AssistanceService assistanceService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<Assistance>> getAllAssistance(
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) Integer day,
            @RequestParam(required = false) Integer month
    ){
        List<Assistance> filteredAssistances = assistanceService.getFilteredAssistances(grade, section, day, month);
        return ResponseEntity.ok(filteredAssistances);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Assistance> create(@RequestBody Assistance assistance){
        return  new ResponseEntity<>(assistanceService.create(assistance), HttpStatus.CREATED);
    }

}
