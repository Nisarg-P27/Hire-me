import { Component } from '@angular/core';
import { Job } from '../../models/job';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job-service';
import { JobDetailsView } from '../../components/job-details-view/job-details-view';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [JobDetailsView],
  templateUrl: './job-details.html',
  styleUrl: './job-details.scss',
})
export class JobDetails {
  
  job: Job | undefined;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.jobService.getJobById(id).subscribe((data) => {
      this.job = data;
    });
  }
}
