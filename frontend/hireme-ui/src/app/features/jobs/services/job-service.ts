import { inject, Injectable } from '@angular/core';
import { Job } from '../models/job';
import { delay } from 'rxjs/internal/operators/delay';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RecruiterJob } from '../models/recruiter-job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly STORAGE_KEY = 'hireme_jobs';

  private readonly baseUrl = 'http://localhost:8080/api/';

  private readonly http = inject(HttpClient);

  private readonly jobsSubject = new BehaviorSubject<Job[]>(this.loadJobsFromStorage() || []);
  readonly jobs$ = this.jobsSubject.asObservable();

  // to view jobs in public router /jobs
  getJobs(): Observable<Job[]> {
    return this.jobs$.pipe(
      delay(1200),
      tap(() => console.log('Jobs emitted')),
    );
  }
  //  to view detailed job in public router /jobs/:id
  getJobById(id: string): Observable<Job | undefined> {
    return this.jobs$.pipe(
      map((jobs) => jobs.find((job) => job.id === id)),
      delay(1200),
    );
  }
  // to view jobs in private router /recruiter/dashboard
  getRecruiterJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.baseUrl}recruiter/jobs`);
  }

  getRecruiterJobById(id: string): Observable<Job | undefined> {
    return this.http.get<Job>(`${this.baseUrl}recruiter/jobs/${id}`);
  }

  createJob(job: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(`${this.baseUrl}recruiter/jobs`, job);
  }
  updateJob(id: string, job: Partial<RecruiterJob>): Observable<Job> {
    return this.http.put<Job>(`${this.baseUrl}recruiter/jobs/${id}`, job);
  }
  deleteJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}recruiter/jobs/${id}`);
  }
  private loadJobsFromStorage(): Job[] {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  }

  private saveJobsToStorage(jobs: Job[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(jobs));
  }
}
