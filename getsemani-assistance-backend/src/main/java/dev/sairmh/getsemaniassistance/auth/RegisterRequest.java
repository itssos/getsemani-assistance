package dev.sairmh.getsemaniassistance.auth;

import dev.sairmh.getsemaniassistance.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    String id;
    String name;
    String surname;
    String password;
    Rol rol;
}
