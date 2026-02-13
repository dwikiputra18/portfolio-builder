'use client';

import { useState } from 'react';
import { CVData } from '../type';

interface UploadPDFProps {
  onDataLoaded: (data: CVData) => void;
}

export default function UploadPDF({ onDataLoaded }: UploadPDFProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset error
    setError('');

    // ✅ Validate type
    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      event.target.value = '';
      return;
    }

    // ✅ Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB.');
      event.target.value = '';
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || 'Failed to upload PDF');
      }

      // ✅ Pastikan data valid
      if (!result) {
        throw new Error('Invalid response from server');
      }

      onDataLoaded(result as CVData);

      // Reset input supaya bisa upload file sama lagi
      event.target.value = '';
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Error processing PDF. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upload PDF Portfolio
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Upload your existing CV/Portfolio in PDF format to auto-fill the forms.
      </p>

      <div className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />

        {uploading && (
          <p className="text-sm text-blue-600">
            Processing PDF...
          </p>
        )}

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
