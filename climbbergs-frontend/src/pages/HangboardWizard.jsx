import { useEffect } from 'react';
import useWizardStore from '../store/wizardStore';
import WizardProgress from '../components/hangboard/wizard/wizardProgress';
import Step1_TemplateSelection from '../components/hangboard/wizard/Step1_TemplateSelection';
import Step2_GripCustomization from '../components/hangboard/wizard/Step2_GripCustomization';
import Step3_MaterialSelection from '../components/hangboard/wizard/Step3_MaterialSelection';

export default function HangboardWizard() {
  const { currentStep, reset } = useWizardStore();

  // Reset wizard on mount (optional)
  useEffect(() => {
    // Uncomment if you want to reset wizard every time user enters
    // reset();
  }, []);

  return (
    <div className="min-h-screen bg-[#E8E4DC]">
      {/* Header */}
      <div className="border-b border-[#D4CFC5] bg-[#F5F3ED]">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center">
          <h1 className="text-4xl font-light mb-2 tracking-tight text-gray-800">
            Bygg Din Hangboard
          </h1>
          <p className="text-gray-600">
            Skapa en skräddarsydd träningsbräda i 3 enkla steg
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <WizardProgress currentStep={currentStep} totalSteps={3} />

      {/* Step Content */}
      <div className="pb-16">
        {currentStep === 1 && <Step1_TemplateSelection />}
        {currentStep === 2 && <Step2_GripCustomization />}
        {currentStep === 3 && <Step3_MaterialSelection />}
      </div>

      {/* Footer Help */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Steg {currentStep} av 3
          </div>
          <div className="text-xs text-gray-500">
            Behöver du hjälp? Kontakta oss: support@climbbergs.se
          </div>
        </div>
      </div>
    </div>
  );
}