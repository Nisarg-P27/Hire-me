package com.hireme.service;

import com.hireme.dto.JobRequest;
import com.hireme.dto.JobResponse;
import com.hireme.entity.JobEntity;
import com.hireme.entity.UserEntity;
import com.hireme.repository.JobRepository;
import com.hireme.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class JobService {
  private final JobRepository jobRepository;
  private final UserRepository userRepository;

  public JobService(JobRepository jobRepository, UserRepository userRepository) {
    this.jobRepository = jobRepository;
    this.userRepository = userRepository;
  }

  public JobResponse createJob(JobRequest request) {
    UUID recruiterId = getCurrentUserId();

    UserEntity currentUser = userRepository.findById(recruiterId)
      .orElseThrow(() -> new EntityNotFoundException("User Not Found!"));//Only Recruiters
    JobEntity job = JobEntity.builder()
      .title(request.title())
      .description(request.description())
      .location(request.location())
      .company(request.company())
      .createdAt(Instant.now())
      .recruiter(currentUser).build();
    System.out.println(job.getCompany());
    System.out.println("Job ID before save: " + currentUser.getId());
    JobEntity savedJob = jobRepository.save(job);
    System.out.println("job saved:" + savedJob);
    return mapToResponse(savedJob);

  }
  public List<JobResponse> getJobs() {

    UUID recruiterId = getCurrentUserId();

    return jobRepository.findByRecruiterId(recruiterId)
      .stream()
      .map(this::mapToResponse)
      .toList();
  }

  public JobResponse getJobById(UUID jobId){
    log.info("in getjobbyid in job service");

    return mapToResponse(jobRepository.findById(jobId).orElseThrow(()-> new RuntimeException("Job not Found")));

  }

  public JobResponse updateJob(UUID jobId, JobRequest request) {
    UUID recruiterId = getCurrentUserId();

    JobEntity job = jobRepository.findById(jobId)
      .orElseThrow(() -> new EntityNotFoundException("Job not found"));

    validateOwnership(job, recruiterId);

    job.setTitle(request.title());
    job.setDescription(request.description());
    job.setLocation(request.location());
    job.setCompany(request.company());

    return mapToResponse(job);
  }

  public void deleteJob(UUID jobId) {

    UUID recruiterId = getCurrentUserId();

    JobEntity job = jobRepository.findById(jobId)
      .orElseThrow(() -> new EntityNotFoundException("Job not found"));

    validateOwnership(job, recruiterId);

    jobRepository.delete(job);
  }

  private UUID getCurrentUserId() {
    Authentication authentication =
      SecurityContextHolder.getContext().getAuthentication();

    return UUID.fromString(authentication.getName());
  }

  private void validateOwnership(JobEntity job, UUID recruiterId) {
    if (!job.getRecruiter().getId().equals(recruiterId)) {
      throw new AccessDeniedException("You do not own this job");
    }
  }

  private JobResponse mapToResponse(JobEntity job) {
    return new JobResponse(
      job.getId(),
      job.getTitle(),
      job.getDescription(),
      job.getLocation(),
      job.getCompany(),
      job.getCreatedAt()
    );
  }

}
