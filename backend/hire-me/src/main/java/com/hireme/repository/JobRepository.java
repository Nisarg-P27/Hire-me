package com.hireme.repository;

import com.hireme.entity.JobEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JobRepository extends JpaRepository<JobEntity, UUID> {
  List<JobEntity> findByRecruiterId(UUID recruiterId);
  Optional<JobEntity> findById(UUID Id);

}
