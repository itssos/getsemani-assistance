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
    public ResponseEntity<List<Assistance>> getAllAssistance(){
        return ResponseEntity.ok(assistanceService.getAllAssistance());
    }
    // ORIGINAL
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    @PostMapping
//    public ResponseEntity<Assistance> create(@RequestBody Assistance assistance){
//        return new ResponseEntity<>(assistanceService.create(assistance), HttpStatus.CREATED);
//    }

    // PRUEBA
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Assistance> create(@RequestBody Assistance assistance){
        return  new ResponseEntity<>(assistanceService.create(assistance), HttpStatus.CREATED);
    }

}
