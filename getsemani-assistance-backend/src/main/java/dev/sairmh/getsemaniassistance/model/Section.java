package dev.sairmh.getsemaniassistance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "section")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "The name cannot be blank.")
    @Size(max = 100, message = "The name must not exceed 100 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The name must contain only letters.")
    private String name;

}
