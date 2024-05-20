package dev.sairmh.getsemaniassistance.config;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ExceptionHandling {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail handleValidation(MethodArgumentNotValidException exception) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        List<String> errors = new ArrayList<>();
        List<FieldError> fieldErrors = exception.getFieldErrors();
        for (FieldError fe : fieldErrors) {
            errors.add(fe.getDefaultMessage());
        }
        problemDetail.setProperty("errors", errors);
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.CONFLICT)  // 409 Conflict
    @ExceptionHandler(DataIntegrityViolationException.class)
    ProblemDetail handleDataIntegrityViolation(DataIntegrityViolationException exception) {
        ProblemDetail problemDetail = ProblemDetail.forStatus(HttpStatus.CONFLICT);
        String message = "Data integrity violation";

        if (exception.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
            org.hibernate.exception.ConstraintViolationException constraintException =
                    (org.hibernate.exception.ConstraintViolationException) exception.getCause();
            if ("student.dni_UNIQUE".equals(constraintException.getConstraintName())) {
                message = "The dni already exists.";
            }
        }

        problemDetail.setTitle("Conflict");
        problemDetail.setDetail(message);
        return problemDetail;
    }
}
