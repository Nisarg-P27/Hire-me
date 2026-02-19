import { Component, Input } from '@angular/core';
import { Job } from '../../models/job';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job-details-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './job-details-view.html',
  styleUrls: ['./job-details-view.scss']
})
export class JobDetailsView {

  @Input({ required: true })
  job!: Job;

}
