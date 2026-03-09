package com.hireme.dto;

public record LoginResponse(
  String token,
  UserDTO user
) {
}
