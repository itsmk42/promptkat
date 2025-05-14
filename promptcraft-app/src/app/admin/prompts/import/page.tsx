"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function ImportPrompts() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewData, setPreviewData] = useState<any[]>([]);

  // Handle file selection
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Reset states
    setFile(selectedFile);
    setError('');
    setSuccess('');
    setPreviewData([]);

    // Validate file type
    if (!selectedFile.name.endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    // Preview the CSV data
    try {
      const text = await selectedFile.text();
      console.log('CSV content preview:', text.substring(0, 200));

      const lines = text.split('\n');

      if (lines.length <= 1) {
        setError('The CSV file appears to be empty');
        return;
      }

      // Parse header and first few rows for preview
      const headers = lines[0].split(',').map(header => header.trim());
      console.log('CSV headers:', headers);

      // Check for required headers
      const requiredHeaders = ['prompt-title', 'prompt-content', 'type', 'categories', 'tags'];
      const missingHeaders = [];

      for (const required of requiredHeaders) {
        // Check for variations of the header
        const variations = [
          required,
          required.replace('-', ''),
          required.replace('-', '_'),
          required.replace('prompt-', ''),
          required.replace('-', ' ')
        ];

        if (!variations.some(v => headers.map(h => h.toLowerCase()).includes(v.toLowerCase()))) {
          missingHeaders.push(required);
        }
      }

      if (missingHeaders.length > 0) {
        setError(`Missing required columns: ${missingHeaders.join(', ')}. Available columns: ${headers.join(', ')}`);
        return;
      }

      const previewRows = [];

      for (let i = 1; i < Math.min(lines.length, 6); i++) {
        if (lines[i].trim()) {
          // Handle CSV parsing more carefully
          let values = [];

          // Simple CSV parsing that handles quoted values
          let currentValue = '';
          let inQuotes = false;

          for (let char of lines[i]) {
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }

          // Add the last value
          values.push(currentValue.trim());

          // Ensure we have enough values
          while (values.length < headers.length) {
            values.push('');
          }

          const row: Record<string, string> = {};

          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });

          previewRows.push(row);
        }
      }

      setPreviewData(previewRows);
    } catch (err) {
      console.error('Error parsing CSV:', err);
      setError('Error parsing CSV file. Please check the format.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Create a new FormData instance
      const formData = new FormData();
      formData.append('file', file);

      console.log('Submitting form with file:', file.name, 'size:', file.size);

      // Make the API request
      const response = await fetch('/api/admin/prompts/import', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, browser will set it with boundary for FormData
      });

      console.log('Response status:', response.status);

      // Parse the response
      let data;
      try {
        data = await response.json();
        console.log('Response data:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        setError('Error parsing server response. Please try again.');
        setIsLoading(false);
        return;
      }

      // Handle error responses
      if (!response.ok) {
        console.error('Import failed with status:', response.status);
        console.error('Error details:', data);

        let errorMessage = 'Failed to import prompts';

        if (data) {
          if (data.error) errorMessage = data.error;
          if (data.details) errorMessage += `: ${data.details}`;
          if (data.errors && data.errors.length > 0) {
            errorMessage += `\n\nErrors:\n${data.errors.slice(0, 5).join('\n')}`;
            if (data.errors.length > 5) {
              errorMessage += `\n...and ${data.errors.length - 5} more errors`;
            }
          }
        }

        setError(errorMessage);
        setIsLoading(false);
        return;
      }

      // Handle success
      setSuccess(data.message || 'Successfully imported prompts');

      // Clear form
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFile(null);
      setPreviewData([]);

    } catch (error: any) {
      console.error('Error importing prompts:', error);
      setError(`An error occurred while importing prompts: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is authenticated and is admin
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </AdminLayout>
    );
  }

  if (status === 'unauthenticated' || (session?.user?.role !== 'admin' && session?.user?.role !== 'superadmin')) {
    router.push('/login');
    return null;
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Import Prompts</h1>
          <Link
            href="/admin/prompts"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm"
          >
            Back to Prompts
          </Link>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">CSV Import Instructions</h2>
            <p className="text-gray-300 mb-4">
              Upload a CSV file with the following columns:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-1">
              <li><code className="bg-gray-700 px-1 rounded">prompt-title</code> - The title of the prompt</li>
              <li><code className="bg-gray-700 px-1 rounded">prompt-content</code> - The actual prompt content</li>
              <li><code className="bg-gray-700 px-1 rounded">tags</code> - Comma-separated tags</li>
              <li><code className="bg-gray-700 px-1 rounded">categories</code> - The category name</li>
              <li><code className="bg-gray-700 px-1 rounded">type</code> - Either "text" or "image"</li>
            </ul>
            <p className="text-gray-300 mb-2">
              The first row should contain the column headers exactly as listed above.
            </p>
            <div className="flex items-center">
              <a
                href="/sample-prompts.csv"
                download
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Sample CSV
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
                Select CSV File
              </label>
              <input
                type="file"
                id="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-600 file:text-white
                  hover:file:bg-purple-700
                  file:cursor-pointer"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded">
                <div className="font-semibold mb-1">Error:</div>
                <div className="whitespace-pre-wrap text-xs">{error}</div>
              </div>
            )}

            {success && (
              <div className="bg-green-900/30 border border-green-500 text-green-300 px-4 py-3 rounded">
                <div className="font-semibold mb-1">Success:</div>
                <div>{success}</div>
              </div>
            )}

            {previewData.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-2">Preview</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        {Object.keys(previewData[0]).map((header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {previewData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((value, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                            >
                              {String(value).substring(0, 50)}
                              {String(value).length > 50 ? '...' : ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
                disabled={isLoading || !file}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Importing...
                  </span>
                ) : 'Import Prompts'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
