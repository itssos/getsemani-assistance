package dev.sairmh.getsemaniassistance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User{
    @Id
    @NotBlank(message = "The dni cannot be blank.")
    @Size(min = 8, max = 8, message = "The dni must be exactly 8 digits.")
    @Pattern(regexp = "^\\d{8}$", message = "The dni must be numerical.")
    private String id;

    @NotBlank(message = "The name cannot be blank.")
    @Size(max = 32, message = "The name must not exceed 32 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The name must contain only letters.")
    private String name;

    @NotBlank(message = "The surname cannot be blank.")
    @Size(max = 32, message = "The surname must not exceed 32 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The surname must contain only letters.")
    private String surname;

    @NotBlank(message = "The surname cannot be blank.")
    private String password;

    @NotBlank(message = "The rol cannot be blank.")
    @Size(max = 16, message = "The rol must not exceed 16 characters.")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ ]+$", message = "The rol must contain only letters.")
    private String rol = "AUXILIAR";

}
