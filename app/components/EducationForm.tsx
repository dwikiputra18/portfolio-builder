'use client';

import { useState } from 'react';
import { Education } from '../type';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    id: Date.now().toString(),
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
  });

  const handleAdd = () => {
    if (!currentEducation.institution || !currentEducation.degree || !currentEducation.fieldOfStudy) {
      alert('Mohon isi semua field yang wajib');
      return;
    }

    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = currentEducation;
      onChange(updated);
      setEditingIndex(null);
    } else {
      onChange([...data, { ...currentEducation, id: Date.now().toString() }]);
    }

    setCurrentEducation({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    });
  };

  const handleEdit = (index: number) => {
    setCurrentEducation(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentEducation({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* List of Added Education */}
      {data.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-700">Pendidikan yang Ditambahkan:</h3>
          {data.map((edu, index) => (
            <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{edu.degree} - {edu.fieldOfStudy}</h4>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Add/Edit Education */}
      <div className="bg-blue-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-800">
          {editingIndex !== null ? 'Edit Pendidikan' : 'Tambah Pendidikan Baru'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Institusi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentEducation.institution}
              onChange={(e) => setCurrentEducation({ ...currentEducation, institution: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Universitas Indonesia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Pendidikan <span className="text-red-500">*</span>
            </label>
            <select
              value={currentEducation.degree}
              onChange={(e) => setCurrentEducation({ ...currentEducation, degree: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">Pilih Tingkat</option>
              <option value="SMA/SMK">SMA/SMK</option>
              <option value="D3">Diploma III (D3)</option>
              <option value="S1">Sarjana (S1)</option>
              <option value="S2">Magister (S2)</option>
              <option value="S3">Doktor (S3)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jurusan/Program Studi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentEducation.fieldOfStudy}
              onChange={(e) => setCurrentEducation({ ...currentEducation, fieldOfStudy: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Teknik Informatika"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="month"
              value={currentEducation.startDate}
              onChange={(e) => setCurrentEducation({ ...currentEducation, startDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tahun Selesai <span className="text-red-500">*</span>
            </label>
            <input
              type="month"
              value={currentEducation.endDate}
              onChange={(e) => setCurrentEducation({ ...currentEducation, endDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IPK/GPA (opsional)
            </label>
            <input
              type="text"
              value={currentEducation.gpa || ''}
              onChange={(e) => setCurrentEducation({ ...currentEducation, gpa: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="3.75"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi/Prestasi (opsional)
            </label>
            <textarea
              value={currentEducation.description || ''}
              onChange={(e) => setCurrentEducation({ ...currentEducation, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Contoh: Lulus dengan predikat Cum Laude, Aktif di organisasi kemahasiswaan"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            {editingIndex !== null ? 'Simpan Perubahan' : '+ Tambah Pendidikan'}
          </button>
          {editingIndex !== null && (
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all font-medium"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {data.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          Belum ada pendidikan yang ditambahkan. Silakan tambahkan minimal satu pendidikan.
        </p>
      )}
    </div>
  );
}