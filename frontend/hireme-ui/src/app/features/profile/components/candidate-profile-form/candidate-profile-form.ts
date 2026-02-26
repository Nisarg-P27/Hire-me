import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CandidateProfile, Experience, Education } from '../../models/candidate_profile';

@Component({
  selector: 'app-candidate-profile-form',
  standalone: true,
  templateUrl: './candidate-profile-form.html',
  styleUrls: ['./candidate-profile-form.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    
  ],
})
export class CandidateProfileForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input({ required: true }) profile!: CandidateProfile;
  @Input({ required: true }) candidateId!: string;

  @Output() save = new EventEmitter<CandidateProfile>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    phone: [''],
    resume: this.fb.group({
      fileName: [''],
      fileSize: [0],
      fileType: [''],
    }),
    experiences: this.fb.array([]),
    educations: this.fb.array([]),
    skills: [''],
    hobbies: [''],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && this.profile) {
      this.initializeForm();
    }
  }

  // ---------- Getters ----------

  get experiences(): FormArray<FormGroup> {
    return this.form.get('experiences') as FormArray<FormGroup>;
  }

  get educations(): FormArray<FormGroup> {
    return this.form.get('educations') as FormArray<FormGroup>;
  }

  // ---------- Initialization ----------

  private initializeForm(): void {
    const cloned = structuredClone(this.profile);
    console.log(this.experiences)
    this.form.patchValue({
      phone: cloned.phone,
      resume: cloned.resume ?? {
        fileName: '',
        fileSize: 0,
        fileType: '',
      },
      skills: cloned.skills.join(', '),
      hobbies: cloned.hobbies.join(', '),
    });

    this.experiences.clear();
    cloned.experiences.forEach((exp) =>
      this.experiences.push(this.createExperienceGroup(exp))
    );

    this.educations.clear();
    cloned.educations.forEach((edu) =>
      this.educations.push(this.createEducationGroup(edu))
    );
  }

  // ---------- Create Groups ----------

  private createExperienceGroup(exp?: Experience): FormGroup {
    return this.fb.group({
      jobTitle: [exp?.jobTitle ?? '', Validators.required],
      company: [exp?.company ?? '', Validators.required],
      yearsOfExperience: [exp?.yearsOfExperience ?? 0],
      jobDescription: [exp?.jobDescription ?? ''],
      startDate: [exp?.startDate ?? ''],
      endDate: [exp?.endDate ?? ''],
    });
  }

  private createEducationGroup(edu?: Education): FormGroup {
    return this.fb.group({
      degree: [edu?.degree ?? '', Validators.required],
      institution: [edu?.institution ?? '', Validators.required],
      fieldOfStudy: [edu?.fieldOfStudy ?? ''],
      startDate: [edu?.startDate ?? ''],
      endDate: [edu?.endDate ?? ''],
      cgpa: [edu?.cgpa ?? ''],
    });
  }

  // ---------- Add / Remove ----------

  addExperience(): void {
    this.experiences.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    this.experiences.removeAt(index);
  }

  addEducation(): void {
    this.educations.push(this.createEducationGroup());
  }

  removeEducation(index: number): void {
    this.educations.removeAt(index);
  }

  // ---------- Resume Upload ----------

  onResumeSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    this.form.patchValue({
      resume: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      },
    });
  }

  // ---------- Save ----------

  onSave(): void {
    const raw = this.form.getRawValue();

    const result: CandidateProfile = {
      candidateId: this.candidateId,
      email: this.profile.email,
      phone: raw.phone,
      resume: raw.resume.fileName ? raw.resume : null,
      experiences: raw.experiences,
      educations: raw.educations,
      skills: raw.skills
        .split(',')
        .map((s: string) => s.trim())
        .filter((s: string) => s),
      hobbies: raw.hobbies
        .split(',')
        .map((h: string) => h.trim())
        .filter((h: string) => h),
    };

    this.save.emit(result);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}