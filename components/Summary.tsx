'use client'

import { useState } from 'react'
import { UserData, Document, Requirement, University } from '@/app/application/page'
import PaymentModal from './PaymentModal'

interface SummaryProps {
  userData: UserData
  documents: Document[]
  selectedCountries: string[]
  requirements: Requirement[]
  universities: University[]
  submitted: boolean
  paid: boolean
  offerLetters: string[]
  onSubmit: () => void
  onPaymentComplete: () => void
  onBack: () => void
}

export default function Summary({
  userData,
  documents,
  selectedCountries,
  requirements,
  universities,
  submitted,
  paid,
  offerLetters,
  onSubmit,
  onPaymentComplete,
  onBack,
}: SummaryProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedUniversities = universities.filter(u => u.selected)
  const selectedRequirements = requirements.filter(r => r.checked)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await onSubmit()
    setIsSubmitting(false)
    setShowPaymentModal(true)
  }

  const handleDownloadOffer = (universityName: string) => {
    if (paid) {
      // Simulate download
      const blob = new Blob(['Demo Offer Letter'], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `offer-letter-${universityName.replace(/\s+/g, '-').toLowerCase()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Summary & Submission</h2>

      {!submitted ? (
        <>
          {/* Summary Content */}
          <div className="space-y-6 mb-8">
            {/* User Details */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Full Name:</span>
                  <span className="ml-2 font-medium">{userData.fullName}</span>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <span className="ml-2 font-medium">{userData.email}</span>
                </div>
                {userData.mobile && (
                  <div>
                    <span className="text-gray-500">Mobile:</span>
                    <span className="ml-2 font-medium">{userData.mobile}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Documents */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Uploaded Documents</h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.type} className="flex items-center space-x-2 text-sm">
                    {doc.file ? (
                      <>
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{doc.fileName}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="text-gray-400">{doc.type.toUpperCase()} - Not uploaded</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Countries & Requirements */}
            <div className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Countries</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCountries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {country}
                  </span>
                ))}
              </div>

              {selectedRequirements.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-4">Selected Requirements</h3>
                  <div className="space-y-1">
                    {selectedRequirements.map((req) => (
                      <div key={req.id} className="text-sm text-gray-700">
                        ✓ {req.label}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Universities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Selected Universities</h3>
              <div className="space-y-2">
                {selectedUniversities.map((uni) => (
                  <div key={uni.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{uni.name}</p>
                    <p className="text-sm text-gray-600">{uni.country}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Success State */}
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
              <p className="text-gray-600">Your application has been successfully submitted.</p>
            </div>

            {/* Offer Letters */}
            {offerLetters.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Offer Letters Received</h4>
                {offerLetters.map((uniName, index) => (
                  <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          Congratulations! {uniName} has sent you an offer letter.
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {paid ? 'Ready to download' : 'Complete payment to download'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDownloadOffer(uniName)}
                        disabled={!paid}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          paid
                            ? 'bg-primary-600 hover:bg-primary-700 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {paid ? 'Download' : 'Locked'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!paid && (
              <div className="mt-8">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
                >
                  Complete Payment to Download Offer Letters
                </button>
              </div>
            )}

            {paid && (
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">
                  ✓ Your offer letters from SecondPassport.ai are ready!
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {showPaymentModal && (
        <PaymentModal
          amount={499}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={() => {
            setShowPaymentModal(false)
            onPaymentComplete()
          }}
        />
      )}
    </div>
  )
}

