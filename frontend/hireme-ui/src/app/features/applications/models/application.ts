import { CandidateProfile } from '../../profile/models/candidate_profile';
import { ApplicationStatus } from './application-status';


export interface Application {
  id: string;
  jobId: string;
  candidateId: string;

  status: ApplicationStatus;
  appliedAt: string;

  candidateProfileSnapshot: CandidateProfile;
}