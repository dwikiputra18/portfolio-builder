export interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
}

export interface Skills {
  technical: string[];
  soft: string[];
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

export interface CVData {
  personalData: PersonalData;
  education: Education[];
  certificates: Certificate[];
  workExperience: WorkExperience[];
  skills: Skills;
}