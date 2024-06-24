package dev.sairmh.getsemaniassistance.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    String id;
    String name;
    String surname;
    String password;
    String rol;
}
