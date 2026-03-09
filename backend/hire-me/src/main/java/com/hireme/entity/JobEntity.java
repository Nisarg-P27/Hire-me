package com.hireme.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "jobs")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class JobEntity {

  @Id
  @Column(updatable = false, nullable = false)
  private UUID id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false, length = 2000)
  private String description;

  @Column(nullable = false)
  private String location;

  @Column(nullable = false)
  private String company;

  @Column(nullable = false, name = "created_at")
  private Instant createdAt;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "recruiter_id", nullable = false)
  private UserEntity recruiter;

  @PrePersist
  protected void onCreate() {
    if (this.id == null) {
      this.id = UUID.randomUUID();
    }
    if (this.createdAt == null) {
      this.createdAt = Instant.now();
    }
  }
}
