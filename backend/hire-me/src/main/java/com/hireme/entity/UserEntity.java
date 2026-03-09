package com.hireme.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UserEntity {

  @Id
  @Column(updatable = false, nullable = false)
  private UUID id;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(name = "password_hash", nullable = false)
  private String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserRole role;

  @Column(nullable = false)
  private String name;

  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  // ===== Lifecycle Hooks =====

  @PrePersist
  protected void onCreate() {
    if (this.id == null) {
      this.id = UUID.randomUUID();
    }

    if (this.createdAt == null) {
      this.createdAt = Instant.now();
    }

    if (this.email != null) {
      this.email = this.email.toLowerCase();
    }
  }
}
