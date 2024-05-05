package dev.sairmh.getsemaniassistance.service;

import dev.sairmh.getsemaniassistance.model.Rol;
import dev.sairmh.getsemaniassistance.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {
    @Autowired
    private RolRepository rolRepository;

    public List<Rol> getAllRoles(){
        return rolRepository.findAll();
    }

    public Rol create(Rol rol){
        return rolRepository.save(rol);
    }

}
