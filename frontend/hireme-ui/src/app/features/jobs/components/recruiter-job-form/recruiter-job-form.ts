import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecruiterJob } from '../../models/recruiter-job';
import { Job } from '../../models/job';

@Component({
  selector: 'app-recruiter-job-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './recruiter-job-form.html',
  styleUrl: './recruiter-job-form.scss'
})
export class RecruiterJobForm implements OnInit {

  @Input() job: Job | null = null;

  @Output() save = new EventEmitter<Partial<RecruiterJob>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  private readonly fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.job?.title ?? ''],
      company: [this.job?.company ?? ''],
      location: [this.job?.location ?? ''],
      description: [this.job?.description ?? '']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.save.emit(this.form.value);
  }
}