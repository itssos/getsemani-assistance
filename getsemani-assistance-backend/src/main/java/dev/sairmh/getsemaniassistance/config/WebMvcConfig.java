package dev.sairmh.getsemaniassistance.config;

import dev.sairmh.getsemaniassistance.jwt.JwtExceptionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final JwtExceptionHandler jwtExceptionHandler;

    public WebMvcConfig(JwtExceptionHandler jwtExceptionHandler) {
        this.jwtExceptionHandler = jwtExceptionHandler;
    }

    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        resolvers.add(jwtExceptionHandler);
    }
}