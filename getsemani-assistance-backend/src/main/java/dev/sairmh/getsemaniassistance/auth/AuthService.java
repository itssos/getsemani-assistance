package dev.sairmh.getsemaniassistance.auth;

import dev.sairmh.getsemaniassistance.jwt.JwtService;
import dev.sairmh.getsemaniassistance.model.User;
import dev.sairmh.getsemaniassistance.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.AuthenticationManager;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getId(),request.getPassword()));
        UserDetails user=userRepository.findById(request.getId()).orElseThrow();
        String token=jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request){
        User user=User.builder().
        id(request.getId()).
        name(request.getName()).
        surname(request.getSurname()).
        password(passwordEncoder.encode(request.getPassword())).
        rol(request.getRol()).build();
        userRepository.save(user);
        return AuthResponse.builder().token(jwtService.getToken(user)).build();
    }
}
