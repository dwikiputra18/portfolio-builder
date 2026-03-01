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
        <div className="flex gap-3 mb-6 print:hidden">
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
        <div className="bg-white rounded-lg shadow-lg p-12 font-serif print:shadow-none print:rounded-none print:p-0">
          {/* Header Section */}
          <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase tracking-tight">
              {personalData.fullName || 'Nama Anda'}
            </h1>
            
            <div className="flex justify-center gap-4 text-sm text-gray-600 flex-wrap">
              {personalData.email && (
                <span>✉ {personalData.email}</span>
              )}
              {personalData.phone && (
                <span>📞 {personalData.phone}</span>
              )}
              {personalData.city && (
                <span>⌂ {personalData.city}</span>
              )}
            </div>

            <div className="flex justify-center gap-4 text-sm mt-3 flex-wrap">
              {personalData.linkedin && (
                <a href={personalData.linkedin} target="_blank" className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              )}
              {personalData.website && (
                <a href={personalData.website} target="_blank" className="text-blue-600 hover:underline">
                  Website
                </a>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalData.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-300 pb-1 uppercase">
                Ringkasan Profesional
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {personalData.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                Pengalaman Kerja
              </h2>
              <div className="space-y-5">
                {workExperience.map((work) => (
                  <div key={work.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-md font-bold text-gray-900 italic">
                        {work.position}
                      </h3>
                      <p className="text-sm text-gray-600 font-sans">
                        {work.startDate} — {work.currentlyWorking ? 'Sekarang' : work.endDate}
                      </p>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {work.company} {work.location && ` | ${work.location}`}
                    </p>
                    <ul className="mt-2 space-y-1 text-gray-700 list-disc ml-5">
                      {work.responsibilities.map((resp, idx) => (
                        <li key={idx} className="pl-1">
                          {resp}
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
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                Pendidikan
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-md font-bold text-gray-900 italic">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-600 font-sans">
                        {edu.startDate} — {edu.endDate}
                      </p>
                    </div>
                    <p className="text-gray-800">
                      {edu.institution}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">
                        IPK: {edu.gpa}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - FIXED SECTION */}
          {(skills.technical.length > 0 || skills.soft.length > 0 || skills.languages.length > 0) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                Keterampilan & Bahasa
              </h2>
              <div className="space-y-2">
                {skills.technical.length > 0 && (
                  <p className="text-gray-800 text-sm">
                    <strong className="font-bold">Teknis:</strong> {skills.technical.join(', ')}
                  </p>
                )}
                {skills.soft.length > 0 && (
                  <p className="text-gray-800 text-sm">
                    <strong className="font-bold">Interpersonal:</strong> {skills.soft.join(', ')}
                  </p>
                )}
                {/* Bagian Perbaikan Utama: Membongkar objek bahasa */}
                {skills.languages.length > 0 && (
                  <p className="text-gray-800 text-sm">
                    <strong className="font-bold">Bahasa:</strong> {
                      skills.languages
                        .map(lang => `${lang.language} (${lang.proficiency})`)
                        .join(', ')
                    }
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1 uppercase">
                Sertifikat & Penghargaan
              </h2>
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline text-sm">
                    <p className="text-gray-700">
                      <span className="font-bold text-gray-800">{cert.name}</span>
                      {cert.issuer && ` — ${cert.issuer}`}
                    </p>
                    {cert.issueDate && (
                      <p className="text-gray-600 font-sans italic ml-4">
                        {cert.issueDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Edit Buttons - Hidden on Print */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3 print:hidden">
          {[
            { label: 'Data Diri', step: 1 },
            { label: 'Pendidikan', step: 2 },
            { label: 'Sertifikat', step: 3 },
            { label: 'Pengalaman', step: 4 },
            { label: 'Keterampilan', step: 5 },
          ].map((btn) => (
            <button
              key={btn.step}
              onClick={() => onEdit(btn.step)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm font-medium shadow-sm"
            >
              ✏️ {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Global CSS for Printing */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            background-color: white !important;
            -webkit-print-color-adjust: exact;
          }
          .print\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}