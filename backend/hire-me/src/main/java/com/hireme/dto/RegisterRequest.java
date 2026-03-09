package com.hireme.dto;

import com.hireme.entity.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(@Email @NotBlank String email,

                              @NotBlank String password,

                              @NotBlank String name,

                              @NotNull UserRole role) {


}
