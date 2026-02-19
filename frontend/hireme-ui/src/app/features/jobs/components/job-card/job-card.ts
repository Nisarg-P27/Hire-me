import { Component, Input } from '@angular/core';
import { Job } from '../../models/job';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './job-card.html',
  styleUrls: ['./job-card.scss']
})
export class JobCard {

  @Input({ required: true })
  job!: Job;

}
