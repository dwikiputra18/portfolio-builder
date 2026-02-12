'use client';

import { useState } from 'react';
import { Certificate } from '../type';

interface CertificateFormProps {
  data: Certificate[];
  onChange: (data: Certificate[]) => void;
}

export default function CertificateForm({ data, onChange }: CertificateFormProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentCertificate, setCurrentCertificate] = useState<Certificate>({
    id: Date.now().toString(),
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
  });

  const handleAdd = () => {
    if (!currentCertificate.name || !currentCertificate.issuer || !currentCertificate.issueDate) {
      alert('Mohon isi semua field yang wajib');
      return;
    }

    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = currentCertificate;
      onChange(updated);
      setEditingIndex(null);
    } else {
      onChange([...data, { ...currentCertificate, id: Date.now().toString() }]);
    }

    setCurrentCertificate({
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    });
  };

  const handleEdit = (index: number) => {
    setCurrentCertificate(data[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setCurrentCertificate({
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Info:</strong> Bagian ini opsional. Anda dapat melewatinya jika tidak memiliki sertifikat pendukung.
          Namun, menambahkan sertifikat yang relevan dapat meningkatkan daya saing CV Anda.
        </p>
      </div>

      {/* List of Added Certificates */}
      {data.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-gray-700">Sertifikat yang Ditambahkan:</h3>
          {data.map((cert, index) => (
            <div key={cert.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{cert.name}</h4>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    Diterbitkan: {cert.issueDate}
                    {cert.expiryDate && ` | Berlaku hingga: ${cert.expiryDate}`}
                  </p>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                  )}
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

      {/* Form Add/Edit Certificate */}
      <div className="bg-blue-50 p-6 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-800">
          {editingIndex !== null ? 'Edit Sertifikat' : 'Tambah Sertifikat Baru'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Sertifikat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentCertificate.name}
              onChange={(e) => setCurrentCertificate({ ...currentCertificate, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: AWS Certified Solutions Architect"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penerbit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={currentCertificate.issuer}
              onChange={(e) => setCurrentCertificate({ ...currentCertificate, issuer: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: Amazon Web Services"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Diterbitkan <span className="text-red-500">*</span>
            </label>
            <input
              type="month"
              value={currentCertificate.issueDate}
              onChange={(e) => setCurrentCertificate({ ...currentCertificate, issueDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Kadaluarsa (opsional)
            </label>
            <input
              type="month"
              value={currentCertificate.expiryDate || ''}
              onChange={(e) => setCurrentCertificate({ ...currentCertificate, expiryDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Kosongkan jika tidak ada masa berlaku</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID Kredensial (opsional)
            </label>
            <input
              type="text"
              value={currentCertificate.credentialId || ''}
              onChange={(e) => setCurrentCertificate({ ...currentCertificate, credentialId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Contoh: ABC123XYZ"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Kredensial (opsional)
            </label>
            <input
              type="url"
              value={currentCertificate.credentialUrl || ''}
              onChange={(e) => setCurrentCertificate({ ...currentCertificate, credentialUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://credential-url.com/verify"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium"
          >
            {editingIndex !== null ? 'Simpan Perubahan' : '+ Tambah Sertifikat'}
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
          <p className="text-gray-500 mb-4">
            Belum ada sertifikat yang ditambahkan.
          </p>
          <p className="text-sm text-gray-400">
            Sertifikat seperti pelatihan profesional, kursus online, atau lisensi dapat menambah nilai CV Anda.
          </p>
        </div>
      )}
    </div>
  );
}