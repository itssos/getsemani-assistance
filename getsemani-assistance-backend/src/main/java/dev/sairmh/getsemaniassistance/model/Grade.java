package dev.sairmh.getsemaniassistance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "grade")
@Data
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonIgnore
    private int id;

    @NotBlank(message = "The grade cannot be blank.")
    @Size(min = 1, max = 1, message = "The grade must have only 1 digit.")
    @Pattern(regexp = "^\\d+$", message = "The grade must be numerical.")
    private String name;

}
