'use client';

import { useState } from 'react';
import { Skills } from '../type';

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  // State lokal untuk input
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState({ language: '', proficiency: '' });

  // --- Handlers untuk Technical Skills ---
  const addTechnicalSkill = () => {
    const value = newTechnicalSkill.trim();
    if (value && !data.technical.includes(value)) {
      onChange({
        ...data,
        technical: [...data.technical, value],
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

  // --- Handlers untuk Soft Skills ---
  const addSoftSkill = () => {
    const value = newSoftSkill.trim();
    if (value && !data.soft.includes(value)) {
      onChange({
        ...data,
        soft: [...data.soft, value],
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

  // --- Handlers untuk Languages ---
  const addLanguage = () => {
    if (newLanguage.language.trim() && newLanguage.proficiency) {
      onChange({
        ...data,
        languages: [...data.languages, { ...newLanguage }],
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
      {/* Technical Skills Section */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Keterampilan Teknis</h3>
          <p className="text-sm text-gray-500 mb-4">Contoh: React, TypeScript, SQL, Microsoft Excel.</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnicalSkill())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
            placeholder="Ketik skill lalu tekan Enter"
          />
          <button
            onClick={addTechnicalSkill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Tambah
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.technical.map((skill, index) => (
            <div key={`tech-${index}`} className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              <span>{skill}</span>
              <button onClick={() => removeTechnicalSkill(index)} className="hover:text-red-500">✕</button>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Soft Skills Section */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Soft Skills</h3>
          <p className="text-sm text-gray-500 mb-4">Contoh: Kepemimpinan, Manajemen Waktu, Komunikasi.</p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSoftSkill())}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-gray-900"
            placeholder="Ketik skill lalu tekan Enter"
          />
          <button
            onClick={addSoftSkill}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Tambah
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.soft.map((skill, index) => (
            <div key={`soft-${index}`} className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm">
              <span>{skill}</span>
              <button onClick={() => removeSoftSkill(index)} className="hover:text-red-500">✕</button>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Languages Section */}
      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Bahasa</h3>
          <p className="text-sm text-gray-500 mb-4">Berapa tingkat kemahiran bahasa Anda?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newLanguage.language}
            onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900"
            placeholder="Contoh: Inggris"
          />
          <select
            value={newLanguage.proficiency}
            onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 bg-white"
          >
            <option value="">Pilih Level</option>
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Advanced">Advanced</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
          </select>
          <button
            onClick={addLanguage}
            className="bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium py-2"
          >
            Tambah Bahasa
          </button>
        </div>

        <div className="space-y-2">
          {data.languages.map((lang, index) => (
            <div key={`lang-${index}`} className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg flex justify-between items-center group">
              <div>
                <span className="font-medium text-gray-800">{lang.language}</span>
                <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded uppercase font-bold">
                  {lang.proficiency}
                </span>
              </div>
              <button onClick={() => removeLanguage(index)} className="text-gray-400 hover:text-red-500 transition-colors">
                ✕
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
        <h4 className="font-bold text-blue-900 mb-2">Ringkasan Keterampilan:</h4>
        <div className="grid grid-cols-3 gap-4 text-sm text-blue-800">
          <div>Technical: <strong>{data.technical.length}</strong></div>
          <div>Soft Skills: <strong>{data.soft.length}</strong></div>
          <div>Bahasa: <strong>{data.languages.length}</strong></div>
        </div>
      </div>
    </div>
  );
}