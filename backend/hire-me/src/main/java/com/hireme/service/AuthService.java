package com.hireme.service;

import com.hireme.dto.LoginRequest;
import com.hireme.dto.LoginResponse;
import com.hireme.dto.RegisterRequest;
import com.hireme.dto.UserDTO;
import com.hireme.entity.UserEntity;
import com.hireme.exception.auth.EmailAlreadyExistsException;
import com.hireme.exception.auth.InvalidCredentialsException;
import com.hireme.repository.UserRepository;
import com.hireme.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(UserRepository userRepository,
                     PasswordEncoder passwordEncoder,
                     JwtService jwtService) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  public LoginResponse register(RegisterRequest request){
    if(userRepository.existsByEmail(request.email().toLowerCase())){
      throw new EmailAlreadyExistsException(request.email());
    }
    String encodedPassword = passwordEncoder.encode(request.password());

    UserEntity user = UserEntity.builder()
      .email(request.email())
      .passwordHash(encodedPassword)
      .name(request.name())
      .role(request.role())
      .build();

    UserEntity savedUser = userRepository.save(user);
    UserDTO userdto = mapToDto(savedUser);

    String token = jwtService.generateToken(savedUser.getId().toString(),savedUser.getEmail(),savedUser.getRole());

    return new LoginResponse(token, userdto);
  }

  public LoginResponse login(LoginRequest request){
    if(! userRepository.existsByEmail(request.email().toLowerCase())){
      throw new InvalidCredentialsException();
    }
    UserEntity user = userRepository.findByEmail(request.email().toLowerCase());

    if(!passwordEncoder.matches(request.password(),user.getPasswordHash())){
      throw new InvalidCredentialsException();
    }
    UserDTO userdto = mapToDto(user);
    String token = jwtService.generateToken(user.getId().toString(), user.getEmail(), user.getRole());

    return new LoginResponse(token, userdto);
  }

  private UserDTO mapToDto(UserEntity user) {
    return new UserDTO(
      user.getId(),
      user.getEmail(),
      user.getName(),
      user.getRole()
    );
}
}
