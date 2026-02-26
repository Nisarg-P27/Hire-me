import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CandidateProfile } from '../models/candidate_profile';

@Injectable({
  providedIn: 'root',
})
export class CandidateProfileService {
  private readonly STORAGE_KEY = 'hireme_candidate_profiles';

  private readonly profilesSubject =
    new BehaviorSubject<Record<string, CandidateProfile>>(
      this.loadFromSession()
    );

  readonly profiles$ = this.profilesSubject.asObservable();

  constructor() {}

  getProfile(candidateId: string): Observable<CandidateProfile> {
    console.log('Fetching profiles', this.profilesSubject.value);
    return this.profiles$.pipe(
      map((profiles) => {
        const existing = profiles[candidateId];
        return existing ?? this.createEmptyProfile(candidateId);
      })
    );
  }
  getProfileSnapshot(candidateId: string): CandidateProfile {
    const profiles = this.profilesSubject.value;
    console.log('Fetching profile snapshot for candidateId:', candidateId, 'Current profiles:', profiles[candidateId]);
    return profiles[candidateId] ?? null;
  }

  updateProfile(profile: CandidateProfile): void {
    const currentProfile = this.profilesSubject.value;

    const updated: Record<string, CandidateProfile> = {
      ...currentProfile,
      [profile.candidateId]: profile,
    };

    this.persist(updated);
    this.profilesSubject.next(updated);
  }

  // ------------------------------
  // Private Helpers
  // ------------------------------

  private createEmptyProfile(candidateId: string): CandidateProfile {
    return {
      candidateId,
      email: '',
      phone: '',

      resume: null,

      experiences: [],
      educations: [],

      skills: [],
      hobbies: [],
    };
  }

  private loadFromSession(): Record<string, CandidateProfile> {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  private persist(profiles: Record<string, CandidateProfile>): void {
    sessionStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(profiles)
    );
  }
}
