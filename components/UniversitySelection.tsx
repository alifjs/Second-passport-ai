'use client'

import { University } from '@/app/application/page'

interface UniversitySelectionProps {
  universities: University[]
  setUniversities: (universities: University[]) => void
  onNext: () => void
  onBack: () => void
}

export default function UniversitySelection({
  universities,
  setUniversities,
  onNext,
  onBack,
}: UniversitySelectionProps) {
  const toggleUniversity = (id: string) => {
    setUniversities(
      universities.map(uni =>
        uni.id === id ? { ...uni, selected: !uni.selected } : uni
      )
    )
  }

  const handleNext = () => {
    const selectedCount = universities.filter(u => u.selected).length
    if (selectedCount === 0) {
      alert('Please select at least one university')
      return
    }
    onNext()
  }

  const groupedByCountry = universities.reduce((acc, uni) => {
    if (!acc[uni.country]) {
      acc[uni.country] = []
    }
    acc[uni.country].push(uni)
    return acc
  }, {} as { [key: string]: University[] })

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">University Selection</h2>
      
      <p className="text-gray-600 mb-6">
        Select one or more universities from your chosen countries. You can select multiple universities.
      </p>

      <div className="space-y-8">
        {Object.entries(groupedByCountry).map(([country, unis]) => (
          <div key={country}>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">
              {country}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unis.map((uni) => (
                <div
                  key={uni.id}
                  onClick={() => toggleUniversity(uni.id)}
                  className={`p-5 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    uni.selected
                      ? 'border-primary-500 bg-primary-50 shadow-md'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <input
                      type="checkbox"
                      checked={uni.selected}
                      onChange={() => toggleUniversity(uni.id)}
                      className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-white font-bold text-lg">
                          {uni.name.charAt(0)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-1">{uni.name}</h4>
                      <p className="text-sm text-gray-600">{uni.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Selected:</strong> {universities.filter(u => u.selected).length} of {universities.length} universities
        </p>
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

