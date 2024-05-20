package dev.sairmh.getsemaniassistance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "section")
@Data
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "The section cannot be blank.")
    @Size(min = 1, max = 1, message = "The section must be only 1 character.")
    @Pattern(regexp = "^[a-zA-Z]+$", message = "The section must contain only letters.")
    private String name;
}
