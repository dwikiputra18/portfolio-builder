'use client';

import { useState } from 'react';
import { Skills } from '../type';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '' });

  const addTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onChange({
        ...data,
        technical: [...data.technical, newTechnicalSkill.trim()],
      });
      setNewTechnicalSkill('');
    }
  };

  const removeTechnicalSkill = (index: number) => {
    onChange({
      ...data,
      technical: data.technical.filter((_, i) => i !== index),
    });
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim()) {
      onChange({
        ...data,
        soft: [...data.soft, newSoftSkill.trim()],
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index: number) => {
    onChange({
      ...data,
      soft: data.soft.filter((_, i) => i !== index),
    });
  };

  const addLanguage = () => {
    if (newLanguage.language.trim() && newLanguage.proficiency) {
      onChange({
        ...data,
        languages: [...data.languages, newLanguage],
      });
      setNewLanguage({ language: '', proficiency: '' });
    }
  };

  const removeLanguage = (index: number) => {
    onChange({
      ...data,
      languages: data.languages.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Keterampilan Teknis/Hard Skills
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Tambahkan keterampilan teknis yang relevan dengan posisi yang Anda lamar
            (contoh: Python, JavaScript, Data Analysis, Adobe Photoshop)
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTechnicalSkill()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ketik keterampilan teknis dan tekan Enter"
          />
          <button
            onClick={addTechnicalSkill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
          >
            Tambah
          </button>
        </div>

        {data.technical.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeTechnicalSkill(index)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Keterampilan Interpersonal/Soft Skills
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Tambahkan soft skills yang menunjukkan kemampuan Anda bekerja dalam tim
            (contoh: Komunikasi, Leadership, Problem Solving, Teamwork)
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSoftSkill()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ketik soft skill dan tekan Enter"
          />
          <button
            onClick={addSoftSkill}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            Tambah
          </button>
        </div>

        {data.soft.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSoftSkill(index)}
                  className="text-green-600 hover:text-green-800 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Languages */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Kemampuan Bahasa
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Tambahkan bahasa yang Anda kuasai beserta tingkat kemahirannya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newLanguage.language}
            onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
            className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nama bahasa"
          />
          <select
            value={newLanguage.proficiency}
            onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
            className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih tingkat kemahiran</option>
            <option value="Native">Native/Penutur Asli</option>
            <option value="Fluent">Mahir/Fluent</option>
            <option value="Advanced">Lanjutan</option>
            <option value="Intermediate">Menengah</option>
            <option value="Basic">Dasar</option>
          </select>
          <button
            onClick={addLanguage}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium"
          >
            Tambah
          </button>
        </div>

        {data.languages.length > 0 && (
          <div className="space-y-2">
            {data.languages.map((lang, index) => (
              <div
                key={index}
                className="bg-purple-50 border border-purple-200 px-4 py-3 rounded-lg flex justify-between items-center"
              >
                <div>
                  <span className="font-semibold text-purple-900">{lang.language}</span>
                  <span className="text-purple-700 ml-2">- {lang.proficiency}</span>
                </div>
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-purple-600 hover:text-purple-800 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-700 mb-2">Ringkasan:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>✓ {data.technical.length} keterampilan teknis</li>
          <li>✓ {data.soft.length} soft skills</li>
          <li>✓ {data.languages.length} bahasa</li>
        </ul>
        {(data.technical.length === 0 || data.soft.length === 0) && (
          <p className="text-sm text-yellow-700 mt-2">
            ⚠️ Disarankan untuk menambahkan setidaknya beberapa keterampilan di setiap kategori
          </p>
        )}
      </div>
    </div>
  );
}