package dev.sairmh.getsemaniassistance.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "student")
@Data
public class Student {
    @Id
    @NotBlank(message = "The dni cannot be blank.")
    @Size(min = 8, max = 8, message = "The dni must be exactly 8 digits.")
    @Pattern(regexp = "^\\d{8}$", message = "The dni must be numerical.")
    private String id;

    @NotBlank(message = "The name cannot be blank.")
    @Size(max = 50, message = "The name must not exceed 50 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The name must contain only letters.")
    private String name;

    @NotBlank(message = "The surname cannot be blank.")
    @Size(max = 50, message = "The surname must not exceed 50 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The surname must contain only letters.")
    private String surname;

    @ManyToOne
    @JoinColumn(name = "id_grade")
    private Grade grade;

    @ManyToOne
    @JoinColumn(name = "id_section")
    private Section section;

    @NotBlank(message = "The state cannot be blank.")
    @Size(max = 16, message = "The surname must not exceed 16 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The surname must contain only letters.")
    private String state;
}
