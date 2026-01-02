'use client'

import { useState, useRef } from 'react'
import { Document } from '@/app/application/page'

interface DocumentUploadProps {
  documents: Document[]
  setDocuments: (documents: Document[]) => void
  onNext: () => void
  onBack: () => void
}

const documentTypes = [
  { type: 'ssc', label: 'SSC Certificate', required: true },
  { type: 'hsc', label: 'HSC Certificate', required: true },
  { type: 'cv', label: 'CV / Resume', required: true },
  { type: 'passport', label: 'Passport Scan', required: true },
  { type: 'motivation', label: 'Motivation Letter', required: true },
]

export default function DocumentUpload({ documents, setDocuments, onNext, onBack }: DocumentUploadProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handleFileSelect = (type: string, file: File | null) => {
    const updatedDocuments = documents.map(doc =>
      doc.type === type
        ? { ...doc, file, fileName: file ? file.name : '' }
        : doc
    )
    setDocuments(updatedDocuments)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDraggedIndex(index)
  }

  const handleDragLeave = () => {
    setDraggedIndex(null)
  }

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault()
    setDraggedIndex(null)
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      handleFileSelect(type, file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0] || null
    if (file && file.type === 'application/pdf') {
      handleFileSelect(type, file)
    }
  }

  const removeFile = (type: string) => {
    handleFileSelect(type, null)
  }

  const handleNext = () => {
    const allRequiredUploaded = documentTypes
      .filter(dt => dt.required)
      .every(dt => documents.find(d => d.type === dt.type && d.file !== null))
    
    if (allRequiredUploaded) {
      onNext()
    } else {
      alert('Please upload all required documents')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Document Upload</h2>
      
      <div className="space-y-6">
        {documentTypes.map((docType, index) => {
          const document = documents.find(d => d.type === docType.type)
          const hasFile = document?.file !== null

          return (
            <div key={docType.type}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {docType.label} {docType.required && <span className="text-red-500">*</span>}
              </label>
              
              <div
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, docType.type)}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                  draggedIndex === index
                    ? 'border-primary-500 bg-primary-50'
                    : hasFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {hasFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-gray-700">{document?.fileName}</p>
                        <p className="text-xs text-gray-500">PDF uploaded</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(docType.type)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 mb-2">
                      Drag and drop your PDF here, or{' '}
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[docType.type]?.click()}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        browse
                      </button>
                    </p>
                    <p className="text-xs text-gray-500">PDF files only</p>
                  </div>
                )}
                
                <input
                  ref={(el) => (fileInputRefs.current[docType.type] = el)}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileInput(e, docType.type)}
                  className="hidden"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between pt-6 mt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Next
        </button>
      </div>
    </div>
  )
}

