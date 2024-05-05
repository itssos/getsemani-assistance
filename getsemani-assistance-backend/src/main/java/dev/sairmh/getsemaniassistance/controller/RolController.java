package dev.sairmh.getsemaniassistance.controller;

import dev.sairmh.getsemaniassistance.model.Rol;
import dev.sairmh.getsemaniassistance.service.RolService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/roles")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public ResponseEntity<List<Rol>> getAllRoles(){
        return ResponseEntity.ok(rolService.getAllRoles());
    }

    @PostMapping
    public ResponseEntity<Rol> create(@Valid @RequestBody Rol rol){
        return new ResponseEntity<>(rolService.create(rol), HttpStatus.CREATED);
    }

}
