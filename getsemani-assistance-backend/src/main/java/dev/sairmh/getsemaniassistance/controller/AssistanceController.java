package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Assistance;
import dev.sairmh.getsemaniassistance.service.AssistanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/assistance")
public class AssistanceController {
    @Autowired
    private AssistanceService assistanceService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<Assistance>> getAllAssistance(
            @RequestParam(required = false) String education,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) String section,
            @RequestParam(required = false) LocalDateTime startDate,
            @RequestParam(required = false) LocalDateTime endDate
    ) {
        List<Assistance> filteredAssistances = assistanceService.getFilteredAssistances(education, grade, section, startDate, endDate);
        return ResponseEntity.ok(filteredAssistances);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Assistance> create(@RequestBody Assistance assistance){
        return  new ResponseEntity<>(assistanceService.create(assistance), HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/students/tardiness")
    public ResponseEntity<List<Object[]>> getStudentsWithTardiness() {
        List<Object[]> students = assistanceService.findStudentsWithTardiness();
        return ResponseEntity.ok(students);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/assistances")
    public ResponseEntity<List<Object[]>> getAssistancesByUser() {
        List<Object[]> user = assistanceService.getAssistancesByUser();
        return ResponseEntity.ok(user);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/counts")
    public ResponseEntity<List<Object[]>> getAssistanceCounts() {
        List<Object[]> counts = assistanceService.countAssistanceStates();
        return ResponseEntity.ok(counts);
    }
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/tardiness-counts")
    public ResponseEntity<List<Object[]>> getTardinessCounts() {
        List<Object[]> counts = assistanceService.findTardinessCounts();
        return ResponseEntity.ok(counts);
    }
}
