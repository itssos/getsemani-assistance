package dev.sairmh.getsemaniassistance.jwt;

import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

@Component
public class JwtExceptionHandler implements HandlerExceptionResolver {

    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        if (ex instanceof MalformedJwtException) {
            return handleMalformedJwtException(response, ex);
        }
        return null;
    }

    private ModelAndView handleMalformedJwtException(HttpServletResponse response, Exception ex) {
        try {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Token JWT inválido");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ModelAndView();
    }
}