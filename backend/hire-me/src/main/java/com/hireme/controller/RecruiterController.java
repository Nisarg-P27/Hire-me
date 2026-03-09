package com.hireme.controller;

import com.hireme.dto.JobRequest;
import com.hireme.dto.JobResponse;
import com.hireme.service.JobService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("api/recruiter/jobs")
@PreAuthorize("hasRole('RECRUITER')")
public class RecruiterController {
  private final JobService jobService;

  public RecruiterController(JobService jobService){
    this.jobService = jobService;
  }

  @GetMapping
  public ResponseEntity<List<JobResponse>> getRecruiterJobs(){
    return ResponseEntity.ok(jobService.getJobs());
  }
  @GetMapping("/{id}")
  public ResponseEntity<JobResponse> getRecruiterJobById(@PathVariable UUID id){
    log.info("in Get mapping id");
    return  ResponseEntity.ok(jobService.getJobById(id));
  }
  @PostMapping
  public ResponseEntity<JobResponse> createJob(@Valid @RequestBody JobRequest request){
//    System.out.println("Inside controller");
    return ResponseEntity.ok(jobService.createJob(request));
  }

  @PutMapping("/{id}")
  public ResponseEntity<JobResponse> updateJob(
    @PathVariable UUID id,
    @Valid @RequestBody JobRequest request
  ) {
    return ResponseEntity.ok(jobService.updateJob(id, request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteJob(
    @PathVariable UUID id
  ) {
    jobService.deleteJob(id);
    return ResponseEntity.noContent().build();
  }

//    String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    return "Recruiter dashboard accessed by" + userId;
//  }
}
