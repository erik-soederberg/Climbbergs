export default function WizardProgress({ currentStep, totalSteps = 3 }) {
  const steps = [
    { number: 1, name: 'Välj Layout' },
    { number: 2, name: 'Anpassa Grepp' },
    { number: 3, name: 'Material & Färg' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                  currentStep >= step.number
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
                  currentStep >= step.number
                    ? 'text-gray-800'
                    : 'text-gray-400'
                }`}
              >
                {step.name}
              </p>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 -mt-8">
                <div
                  className={`h-full transition-colors ${
                    currentStep > step.number
                      ? 'bg-gray-800'
                      : 'bg-gray-200'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}