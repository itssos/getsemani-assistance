package dev.sairmh.getsemaniassistance.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Table(name = "education_level")
@Data
public class EducationLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonIgnore
    private int id;

    @Column(unique = true)
    @NotBlank(message = "The name cannot be blank.")
    private String name;

    @Column(name = "max_grade")
    private int maxGrade;

    @Column(name = "max_section")
    private int maxSection;
}
