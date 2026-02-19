import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { JobFilters } from '../../models/job-filters';

@Component({
  selector: 'app-job-search-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './job-search-panel.html',
  styleUrls: ['./job-search-panel.scss']
})
export class JobSearchPanel {

  @Output() apply = new EventEmitter<JobFilters>();
  @Output() close = new EventEmitter<void>();

  form = new FormGroup<{
    title: FormControl<string>;
    location: FormControl<string>;
    company: FormControl<string>;
  }>({
    title: new FormControl('', { nonNullable: true }),
    location: new FormControl('', { nonNullable: true }),
    company: new FormControl('', { nonNullable: true })
  });

  onApply() {
    this.apply.emit(this.form.getRawValue());
  }

  onClear() {
    this.form.reset({
      title: '',
      location: '',
      company: ''
    });
  }

  onClose() {
    this.close.emit();
  }
}
