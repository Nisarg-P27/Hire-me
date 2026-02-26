import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../models/job';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './job-card.html',
  styleUrls: ['./job-card.scss'],
})
export class JobCard {
  @Input() job!: Job;
  @Input() isApplied: boolean = false;
  @Input() canApply: boolean = false;
  @Output() apply = new EventEmitter<Job>();

  onApply() {
    console.log('Applying to job:', this.job.title);
    this.apply.emit(this.job);
  }
}
