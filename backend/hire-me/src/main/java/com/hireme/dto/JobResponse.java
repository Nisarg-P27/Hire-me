package com.hireme.dto;

import java.time.Instant;
import java.util.UUID;

public record JobResponse(
  UUID id,
  String title,
  String description,
  String location,
  String company,
  Instant createdAt
) {
}
