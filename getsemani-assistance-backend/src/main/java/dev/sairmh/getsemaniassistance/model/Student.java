package dev.sairmh.getsemaniassistance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "students")
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

    @NotBlank(message = "The grade cannot be blank.")
    @Size(max = 1, message = "The grade must be a single digit.")
    @Pattern(regexp = "^[0-9]$", message = "The grade should not have letters.")
    private String grade;

    @NotBlank(message = "The section cannot be blank.")
    @Size(max = 1, message = "The section must be a single character.")
    @Pattern(regexp = "^[a-zA-Z]$", message = "The section must contain only one letter.")
    private String section;
}
