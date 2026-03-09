package com.hireme.dto;

import com.hireme.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

public record UserDTO(
  UUID id,
  String email,
  String name,
  UserRole role
) {}
