package dev.sairmh.getsemaniassistance.exception;

public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(String id) {
        super("Student not found with id " + id);
    }
}
