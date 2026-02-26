export interface Experience {
  jobTitle: string;
  company: string;
  yearsOfExperience: number;
  jobDescription: string;
  startDate: string; // ISO string
  endDate: string; // ISO string | ''
}

export interface Education {
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  cgpa: string;
}
export interface ResumeMeta {
  fileName: string;
  fileSize: number;
  fileType: string;
}

export interface CandidateProfile {
  candidateId: string;
  email: string;
  phone: string;

  resume: ResumeMeta | null;

  experiences: Experience[];

  educations: Education[];

  skills: string[];
  hobbies: string[];
}
