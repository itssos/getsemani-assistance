package dev.sairmh.getsemaniassistance.config;


import dev.sairmh.getsemaniassistance.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final JwtAuthenticationFilter jwtAuthenticactionFilter;
        private final AuthenticationProvider authProvider;
    //obetener todas las cadenas de filtros
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http
                .csrf(csrf->
                        csrf.disable())
                .authorizeHttpRequests(authRequest ->
                            authRequest
                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                .requestMatchers("/auth/**").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/user").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.POST,"/api/user/**").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/user/**").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.PUT,"/api/user/**").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/section").hasAnyAuthority("ADMIN","AUXILIAR")
                                .requestMatchers(HttpMethod.POST,"/api/assistance").hasAnyAuthority("ADMIN","AUXILIAR")
                                .anyRequest().authenticated()
                )
                .sessionManagement(sessionManager->
                        sessionManager
                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authProvider)
                .addFilterBefore(jwtAuthenticactionFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

}
