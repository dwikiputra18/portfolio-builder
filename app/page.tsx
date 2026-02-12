'use client';

import { useState } from 'react';
import PersonalDataForm from './components/PersonalDataForm';
import EducationForm from './components/EducationForm';
import CertificateForm from './components/CertificateForm';
import WorkExperienceForm from './components/WorkExperienceForm';
import SkillsForm from './components/SkillsForm';
import CVPreview from './components/CVPreview';
import { CVData, PersonalData, Education, Certificate, WorkExperience, Skills } from './types';

const initialPersonalData: PersonalData = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  linkedin: '',
  website: '',
  summary: '',
};

const initialSkills: Skills = {
  technical: [],
  soft: [],
  languages: [],
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalData, setPersonalData] = useState<PersonalData>(initialPersonalData);
  const [education, setEducation] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skills>(initialSkills);
  const [showPreview, setShowPreview] = useState(false);

  const cvData: CVData = {
    personalData,
    education,
    certificates,
    workExperience,
    skills,
  };

  const steps = [
    { number: 1, title: 'Data Diri', component: PersonalDataForm },
    { number: 2, title: 'Pendidikan', component: EducationForm },
    { number: 3, title: 'Sertifikat', component: CertificateForm },
    { number: 4, title: 'Pengalaman Kerja', component: WorkExperienceForm },
    { number: 5, title: 'Keterampilan', component: SkillsForm },
  ];

  // Map step number to data and setter
  const stepDataMap: Record<number, { data: unknown; onChange: (data: unknown) => void }> = {
    1: { data: personalData, onChange: setPersonalData },
    2: { data: education, onChange: setEducation },
    3: { data: certificates, onChange: setCertificates },
    4: { data: workExperience, onChange: setWorkExperience },
    5: { data: skills, onChange: setSkills },
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPreview(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    setShowPreview(false);
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;
  const currentStepData = stepDataMap[currentStep];

  if (showPreview) {
    return (
      <CVPreview 
        data={cvData} 
        onEdit={handleEditStep}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            CV Builder ATS-Friendly
          </h1>
          <p className="text-gray-600">
            Buat CV profesional yang mudah dibaca oleh sistem ATS
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all ${
                      currentStep === step.number
                        ? 'bg-blue-600 text-white scale-110'
                        : currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <span className={`text-xs text-center ${
                    currentStep === step.number ? 'text-blue-600 font-semibold' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 transition-all ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {steps[currentStep - 1]?.title}
          </h2>

          {CurrentStepComponent && currentStepData && (
            <CurrentStepComponent
              data={currentStepData.data}
              onChange={currentStepData.onChange}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              aria-label="Go to previous step"
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              ← Sebelumnya
            </button>

            <button
              onClick={handleNext}
              aria-label={currentStep === steps.length ? 'View CV preview' : 'Go to next step'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              {currentStep === steps.length ? 'Lihat Preview CV' : 'Selanjutnya →'}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Tips ATS-Friendly:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Gunakan format yang sederhana dan konsisten</li>
            <li>• Hindari penggunaan tabel, gambar, atau grafik yang kompleks</li>
            <li>• Gunakan kata kunci yang relevan dengan posisi yang dilamar</li>
            <li>• Simpan CV dalam format PDF atau DOCX</li>
          </ul>
        </div>
      </div>
    </div>
  );
}