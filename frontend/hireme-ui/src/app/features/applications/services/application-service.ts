import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Application } from '../models/application';
import { User } from '../../auth/models/user';
import { UserRole } from '../../auth/models/user-role';
import { CandidateProfileService } from '../../profile/services/candidate-profile-service';
import { ApplicationStatus } from '../models/application-status';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private readonly STORAGE_KEY = 'hireme_applications';
  private readonly candidateProfileService = inject(CandidateProfileService);

  private readonly applicationsSubject = new BehaviorSubject<Application[]>(this.loadApplicationsFromStorage() || []);
  readonly applications$ = this.applicationsSubject.asObservable();

  apply(jobId: string, user: User | null): Observable<void> {
    // console.log(jobId, user);
    if (!user) {
      throw new Error('User must be logged in to apply for a job.');
    }
    if (user.role !== UserRole.Candidate) {
      throw new Error('Only candidates can apply');
    }
    const currentApplications = this.applicationsSubject.value;
    // console.log(currentApplications);
    const alreadyApplied = currentApplications.some(
      (app) => app.jobId === jobId && app.candidateId === user.id,
    );

    if (alreadyApplied) {
      // console.log('User has already applied for this job', jobId);
      return of(void 0);
    } 
    
    const profile = this.candidateProfileService.getProfileSnapshot(user.id);
    if (!profile) {
      throw new Error('Candidate profile not found');
    }
    const snapshot = structuredClone(profile);
    console.log('Creating application with profile snapshot:', snapshot);
    const newApplication: Application = {
      id: crypto.randomUUID(),
      jobId,
      candidateId: user.id,
      status: ApplicationStatus.Applied,
      appliedAt: new Date().toISOString(),
      candidateProfileSnapshot: snapshot,
    };
    // console.log('Adding new application:', newApplication);
    this.applicationsSubject.next([...currentApplications, newApplication]);
    this.saveApplicationsToStorage([...currentApplications, newApplication]);
    // console.log('exiting onApply method of ApplicationService with new application added');
    return of(void 0);
  }
  updateApplicationStatus(applicationId: string, newStatus: ApplicationStatus): void {
  const currentApplications = this.applicationsSubject.value;
  const updatedApplications = currentApplications.map((app) => {
  if (app.id !== applicationId)  return app; 
  return { ...app, status: newStatus };
  })
  this.applicationsSubject.next(updatedApplications);
  this.saveApplicationsToStorage(updatedApplications);
  }
  
  private loadApplicationsFromStorage(): Application[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  private saveApplicationsToStorage(applications: Application[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(applications));
  }

  getApplicationsByJob(jobId: string): Application[] {
    return this.applicationsSubject.value.filter((app) => app.jobId === jobId);
  }

  getApplicationsByCandidate(candidateId: string): Application[] {
    return this.applicationsSubject.value.filter((app) => app.candidateId === candidateId);
  }
}
