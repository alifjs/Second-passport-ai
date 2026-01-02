'use client'

import { useState } from 'react'
import ProgressBar from '@/components/ProgressBar'
import RegistrationForm from '@/components/RegistrationForm'
import DocumentUpload from '@/components/DocumentUpload'
import CountrySelection from '@/components/CountrySelection'
import UniversitySelection from '@/components/UniversitySelection'
import Summary from '@/components/Summary'
import Footer from '@/components/Footer'

export interface UserData {
  fullName: string
  email: string
  mobile: string
  password: string
}

export interface Document {
  type: string
  file: File | null
  fileName: string
}

export interface Country {
  name: string
  code: string
}

export interface Requirement {
  id: string
  label: string
  checked: boolean
}

export interface University {
  id: string
  name: string
  country: string
  description: string
  selected: boolean
}

const TOTAL_STEPS = 5

export default function ApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
  })
  const [documents, setDocuments] = useState<Document[]>([
    { type: 'ssc', file: null, fileName: '' },
    { type: 'hsc', file: null, fileName: '' },
    { type: 'cv', file: null, fileName: '' },
    { type: 'passport', file: null, fileName: '' },
    { type: 'motivation', file: null, fileName: '' },
  ])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: 'parents', label: 'Include parents', checked: false },
    { id: 'spouse', label: 'Include spouse', checked: false },
    { id: 'pr', label: 'PR options', checked: false },
    { id: 'work-visa', label: 'Post-study work visa', checked: false },
    { id: 'scholarship', label: 'Scholarship options', checked: false },
  ])
  const [universities, setUniversities] = useState<University[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [paid, setPaid] = useState(false)
  const [offerLetters, setOfferLetters] = useState<string[]>([])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Simulate submission
    setSubmitted(true)
    
    // Generate demo offer letters based on selected universities
    const selectedUnis = universities.filter(u => u.selected)
    const letters = selectedUnis.map(u => u.name)
    setOfferLetters(letters)
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 3000))
  }

  const handlePaymentComplete = () => {
    setPaid(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-700">SecondPassport.ai</h1>
        </div>
      </div>

      <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {currentStep === 1 && (
          <RegistrationForm
            userData={userData}
            setUserData={setUserData}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <DocumentUpload
            documents={documents}
            setDocuments={setDocuments}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <CountrySelection
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            requirements={requirements}
            setRequirements={setRequirements}
            onNext={handleNext}
            onBack={handleBack}
            setUniversities={setUniversities}
          />
        )}

        {currentStep === 4 && (
          <UniversitySelection
            universities={universities}
            setUniversities={setUniversities}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 5 && (
          <Summary
            userData={userData}
            documents={documents}
            selectedCountries={selectedCountries}
            requirements={requirements}
            universities={universities}
            submitted={submitted}
            paid={paid}
            offerLetters={offerLetters}
            onSubmit={handleSubmit}
            onPaymentComplete={handlePaymentComplete}
            onBack={handleBack}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

