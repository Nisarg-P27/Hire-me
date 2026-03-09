package com.hireme.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record JobRequest(
  @NotBlank
  @Size(max = 255)
  String title,

  @NotBlank
  @Size(max = 2000)
  String description,

  @NotBlank
  @Size(max = 255)
  String location,

  @NotBlank
  @Size(max = 255)
  String company
) {

}
