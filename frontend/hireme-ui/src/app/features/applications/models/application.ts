import { CandidateProfile } from '../../profile/models/candidate_profile';

export type ApplicationStatus = 'applied' | 'reviewing' | 'rejected' | 'accepted';

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;

  status: ApplicationStatus;
  appliedAt: string;

  candidateProfileSnapshot: CandidateProfile;
}