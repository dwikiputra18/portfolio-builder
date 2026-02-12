'use client';

import { useState } from 'react';
import { WorkExperience } from '../type';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentWork, setCurrentWork] = useState<WorkExperience>({
    id: Date.now().toString(),
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    responsibilities: [''],
  });

  const handleAdd = () => {
    if (!currentWork.company || !currentWork.position || !currentWork.startDate) {
      alert('Mohon isi semua field yang wajib');
      return;
    }

    const filteredResponsibilities = currentWork.responsibilities.filter(r => r.trim() !== '');
    if (filteredResponsibilities.length === 0) {
      alert('Mohon tambahkan minimal satu tanggung jawab/pencapaian');
      return;
    }

    const workToSave = {
      ...currentWork,
      responsibilities: filteredResponsibilities,
    };

    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = workToSave;
      onChange(updated);
      setEditingIndex(null);
    } else {
      onChange([...data, { ...workToSave, id: Date.now().toString() }]);
    }

    setCurrentWork({
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: [''],
    });
  };

  const handleEdit = (index: number) => {
    setCurrentWork(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentWork({
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: [''],
    });
  };

  const addResponsibility = () => {
    setCurrentWork({
      ...currentWork,
      responsibilities: [...currentWork.responsibilities, ''],
    });
  };

  const updateResponsibility = (index: number, value: string) => {
    const updated = [...currentWork.responsibilities];
    updated[index] = value;
    setCurrentWork({ ...currentWork, responsibilities: updated });
  };

  const removeResponsibility = (index: number) => {
    if (currentWork.responsibilities.length > 1) {
      setCurrentWork({
        ...currentWork,
        responsibilities: currentWork.responsibilities.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* List of Added Work Experience */}
      {data.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-700">Pengalaman Kerja yang Ditambahkan:</h3>
          {data.map((work, index) => (
            <div key={work.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{work.position}</h4>
                  <p className="text-gray-600">{work.company} - {work.location}</p>
                  <p className="text-sm text-gray-500">
                    {work.startDate} - {work.currentlyWorking ? 'Sekarang' : work.endDate}
                  </p>
                  <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                    {work.responsibilities.slice(0, 2).map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                    {work.responsibilities.length > 2 && (
                      <li className="text-gray-400">...dan {work.responsibilities.length - 2} lainnya</li>
                    )}
                  </ul>
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

      {/* Form Add/Edit Work Experience */}
      <div className="bg-blue-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-800">
          {editingIndex !== null ? 'Edit Pengalaman Kerja' : 'Tambah Pengalaman Kerja Baru'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Perusahaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentWork.company}
              onChange={(e) => setCurrentWork({ ...currentWork, company: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="PT. Teknologi Indonesia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Posisi/Jabatan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentWork.position}
              onChange={(e) => setCurrentWork({ ...currentWork, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi
            </label>
            <input
              type="text"
              value={currentWork.location}
              onChange={(e) => setCurrentWork({ ...currentWork, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Jakarta, Indonesia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Mulai <span className="text-red-500">*</span>
            </label>
            <input
              type="month"
              value={currentWork.startDate}
              onChange={(e) => setCurrentWork({ ...currentWork, startDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Selesai
            </label>
            <input
              type="month"
              value={currentWork.endDate}
              onChange={(e) => setCurrentWork({ ...currentWork, endDate: e.target.value })}
              disabled={currentWork.currentlyWorking}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-gray-900"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentWork.currentlyWorking}
                onChange={(e) => setCurrentWork({ 
                  ...currentWork, 
                  currentlyWorking: e.target.checked,
                  endDate: e.target.checked ? '' : currentWork.endDate
                })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Saya masih bekerja di sini
              </span>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggung Jawab & Pencapaian <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Gunakan kata kerja aktif dan kuantifikasi pencapaian jika memungkinkan.
              Contoh: "Mengembangkan fitur yang meningkatkan efisiensi 30%"
            </p>
            
            <div className="space-y-3">
              {currentWork.responsibilities.map((resp, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-1">
                    <textarea
                      value={resp}
                      onChange={(e) => updateResponsibility(index, e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder={`Tanggung jawab/pencapaian ${index + 1}`}
                    />
                  </div>
                  {currentWork.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Hapus"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addResponsibility}
              className="mt-3 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all text-sm font-medium"
            >
              + Tambah Tanggung Jawab
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            {editingIndex !== null ? 'Simpan Perubahan' : '+ Tambah Pengalaman'}
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
        <div className="text-center py-8">
          <p className="text-gray-500 mb-2">
            Belum ada pengalaman kerja yang ditambahkan.
          </p>
          <p className="text-sm text-gray-400">
            Jika Anda fresh graduate, Anda dapat menambahkan pengalaman magang, proyek, atau kegiatan organisasi.
          </p>
        </div>
      )}
    </div>
  );
}