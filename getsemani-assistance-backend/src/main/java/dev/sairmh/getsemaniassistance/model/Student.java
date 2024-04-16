package dev.sairmh.getsemaniassistance.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    private int id;

    private String name;
    private String surname;
    private int grade;
    private String section;
}
