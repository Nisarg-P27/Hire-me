package com.hireme.repository;

import com.hireme.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

  UserEntity findByEmail(String email);


  boolean existsByEmail(String email);
}
