'use client'

import { Requirement, University } from '@/app/application/page'

interface CountrySelectionProps {
  selectedCountries: string[]
  setSelectedCountries: (countries: string[]) => void
  requirements: Requirement[]
  setRequirements: (requirements: Requirement[]) => void
  onNext: () => void
  onBack: () => void
  setUniversities: (universities: University[]) => void
}

const countries = [
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  { name: 'Germany', code: 'DE' },
  { name: 'USA', code: 'US' },
  { name: 'UK', code: 'GB' },
]

const universityData: { [key: string]: University[] } = {
  'Canada': [
    { id: 'toronto', name: 'University of Toronto', country: 'Canada', description: 'One of Canada\'s top research universities', selected: false },
    { id: 'mcgill', name: 'McGill University', country: 'Canada', description: 'Renowned for academic excellence', selected: false },
    { id: 'ubc', name: 'University of British Columbia', country: 'Canada', description: 'Leading global university', selected: false },
  ],
  'Australia': [
    { id: 'sydney', name: 'University of Sydney', country: 'Australia', description: 'Australia\'s first university', selected: false },
    { id: 'unsw', name: 'UNSW Sydney', country: 'Australia', description: 'Top-ranked research university', selected: false },
    { id: 'melbourne', name: 'University of Melbourne', country: 'Australia', description: 'World-class education hub', selected: false },
  ],
  'Germany': [
    { id: 'lmu', name: 'LMU Munich', country: 'Germany', description: 'Excellence in research and teaching', selected: false },
    { id: 'tu-berlin', name: 'TU Berlin', country: 'Germany', description: 'Leading technical university', selected: false },
  ],
  'USA': [
    { id: 'mit', name: 'MIT', country: 'USA', description: 'Massachusetts Institute of Technology', selected: false },
    { id: 'harvard', name: 'Harvard University', country: 'USA', description: 'Ivy League excellence', selected: false },
    { id: 'stanford', name: 'Stanford University', country: 'USA', description: 'Innovation and entrepreneurship', selected: false },
  ],
  'UK': [
    { id: 'oxford', name: 'University of Oxford', country: 'UK', description: 'World\'s oldest English-speaking university', selected: false },
    { id: 'cambridge', name: 'University of Cambridge', country: 'UK', description: 'Academic excellence since 1209', selected: false },
    { id: 'imperial', name: 'Imperial College London', country: 'UK', description: 'Science, engineering, and medicine', selected: false },
  ],
}

export default function CountrySelection({
  selectedCountries,
  setSelectedCountries,
  requirements,
  setRequirements,
  onNext,
  onBack,
  setUniversities,
}: CountrySelectionProps) {
  const toggleCountry = (countryName: string) => {
    if (selectedCountries.includes(countryName)) {
      setSelectedCountries(selectedCountries.filter(c => c !== countryName))
    } else {
      setSelectedCountries([...selectedCountries, countryName])
    }
  }

  const toggleRequirement = (id: string) => {
    setRequirements(
      requirements.map(req =>
        req.id === id ? { ...req, checked: !req.checked } : req
      )
    )
  }

  const handleNext = () => {
    if (selectedCountries.length === 0) {
      alert('Please select at least one country')
      return
    }

    // Generate universities based on selected countries
    const allUniversities: University[] = []
    selectedCountries.forEach(country => {
      if (universityData[country]) {
        allUniversities.push(...universityData[country])
      }
    })
    setUniversities(allUniversities)
    onNext()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Country & Requirements Selection</h2>
      
      <div className="space-y-8">
        {/* Country Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Countries <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <div
                key={country.code}
                onClick={() => toggleCountry(country.name)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCountries.includes(country.name)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country.name)}
                    onChange={() => toggleCountry(country.name)}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{country.name}</p>
                    <p className="text-xs text-gray-500">{country.code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Requirements & Options
          </label>
          <div className="space-y-3">
            {requirements.map((req) => (
              <div key={req.id} className="flex items-start space-x-3 group">
                <input
                  type="checkbox"
                  id={req.id}
                  checked={req.checked}
                  onChange={() => toggleRequirement(req.id)}
                  className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <label htmlFor={req.id} className="text-gray-700 cursor-pointer flex items-center">
                    {req.label}
                    <div className="ml-2 relative">
                      <svg
                        className="w-4 h-4 text-gray-400 cursor-help"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded-lg p-2 z-10">
                        {req.id === 'parents' && 'Include parents in the application process'}
                        {req.id === 'spouse' && 'Include spouse in the application'}
                        {req.id === 'pr' && 'Explore permanent residency options'}
                        {req.id === 'work-visa' && 'Post-study work visa assistance'}
                        {req.id === 'scholarship' && 'Scholarship application support'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
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

