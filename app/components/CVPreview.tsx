'use client';

import { CVData } from '../type';

interface CVPreviewProps {
  data: CVData;
  onEdit: (stepNumber: number) => void;
  onBack: () => void;
}

export default function CVPreview({ data, onEdit, onBack }: CVPreviewProps) {
  const { personalData, education, certificates, workExperience, skills } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Controls */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={onBack}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all font-medium"
          >
            ← Kembali
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
          >
            🖨️ Cetak/Simpan PDF
          </button>
        </div>

        {/* CV Document */}
        <div className="bg-white rounded-lg shadow-lg p-12 font-serif print:shadow-none print:rounded-none">
          {/* Header Section */}
          <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {personalData.fullName || 'Nama Anda'}
            </h1>
            
            <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
              {personalData.email && (
                <span> ✉{personalData.email}</span>
              )}
              {personalData.phone && (
                <span> 📞 {personalData.phone}</span>
              )}
              {personalData.city && (
                <span> ⌂ {personalData.city}</span>
              )}
            </div>

            <div className="flex justify-center gap-4 text-sm mt-3 flex-wrap">
              {personalData.linkedin && (
                <a href={personalData.linkedin} className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              )}
              {personalData.website && (
                <a href={personalData.website} className="text-blue-600 hover:underline">
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                RINGKASAN PROFESIONAL
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalData.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                PENGALAMAN KERJA
              </h2>
              <div className="space-y-4">
                {workExperience.map((work) => (
                  <div key={work.id} className="mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {work.position}
                        </h3>
                        <p className="text-gray-700">
                          {work.company}
                          {work.location && ` • ${work.location}`}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 whitespace-nowrap">
                        {work.startDate} - {work.currentlyWorking ? 'Sekarang' : work.endDate}
                      </p>
                    </div>
                    <ul className="mt-2 space-y-1 text-gray-700">
                      {work.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-gray-900">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                PENDIDIKAN
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {edu.degree}
                        </h3>
                        <p className="text-gray-700">
                          {edu.institution}
                        </p>
                        {edu.gpa && (
                          <p className="text-sm text-gray-600">
                            GPA: {edu.gpa}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 whitespace-nowrap">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                KETERAMPILAN
              </h2>
              <div className="space-y-3">
                {skills.technical.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-900">Teknis:</p>
                    <p className="text-gray-700">
                      {skills.technical.join(', ')}
                    </p>
                  </div>
                )}
                {skills.soft.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-900">Soft Skills:</p>
                    <p className="text-gray-700">
                      {skills.soft.join(', ')}
                    </p>
                  </div>
                )}
                {skills.languages.length > 0 && (
                  <div>
                    <p className="font-semibold text-gray-900">Bahasa:</p>
                    <p className="text-gray-700">
                      {skills.languages.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                SERTIFIKAT
              </h2>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <p className="text-gray-700">
                      {cert.name}
                      {cert.issuer && ` • ${cert.issuer}`}
                    </p>
                    {cert.issueDate && (
                      <p className="text-sm text-gray-600 whitespace-nowrap">
                        {cert.issueDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Edit Buttons */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3 print:hidden">
          <button
            onClick={() => onEdit(1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
          >
            ✏️ Data Diri
          </button>
          <button
            onClick={() => onEdit(2)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
          >
            ✏️ Pendidikan
          </button>
          <button
            onClick={() => onEdit(3)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
          >
            ✏️ Sertifikat
          </button>
          <button
            onClick={() => onEdit(4)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
          >
            ✏️ Pengalaman
          </button>
          <button
            onClick={() => onEdit(5)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all text-sm font-medium"
          >
            ✏️ Keterampilan
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body {
            background: white;
          }
          .print\:hidden {
            display: none;
          }
          .print\:shadow-none {
            box-shadow: none;
          }
          .print\:rounded-none {
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}