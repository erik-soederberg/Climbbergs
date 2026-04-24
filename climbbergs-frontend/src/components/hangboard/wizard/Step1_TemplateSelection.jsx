import { HANGBOARD_TEMPLATES, DIFFICULTY_COLORS } from '../../../constants/templates';
import useWizardStore from '../../../store/wizardStore';

export default function Step1_TemplateSelection() {
  const { selectedTemplate, selectTemplate, nextStep } = useWizardStore();

  const handleSelectTemplate = (templateId) => {
    const template = HANGBOARD_TEMPLATES[templateId];
    selectTemplate(template);
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      alert('Välj en layout först!');
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light mb-3 text-gray-800">
          Välj Din Hangboard-Layout
        </h2>
        <p className="text-gray-600">
          Börja med en förinställd design eller bygg från grunden
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {Object.values(HANGBOARD_TEMPLATES).map((template) => {
          const difficultyStyle = DIFFICULTY_COLORS[template.difficulty];
          const isSelected = selectedTemplate?.id === template.id;

          return (
            <button
              key={template.id}
              onClick={() => handleSelectTemplate(template.id)}
              className={`text-left p-6 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-gray-800 bg-gray-50 shadow-lg'
                  : 'border-gray-300 hover:border-gray-500 hover:shadow-md'
              }`}
            >
              {/* Template Preview */}
              <div className="aspect-[3/1] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                {/* Simple visualization of grips */}
                <div className="absolute inset-4 flex items-center justify-center gap-2">
                  {template.grips.slice(0, 8).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 bg-gray-400 rounded-full opacity-60"
                    />
                  ))}
                </div>
                
                {/* Badge */}
                <div className={`absolute top-2 right-2 px-3 py-1 rounded text-xs font-medium ${difficultyStyle.badge} ${difficultyStyle.text}`}>
                  {template.difficulty.toUpperCase()}
                </div>
              </div>

              {/* Template Info */}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {template.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {template.description}
              </p>

              {/* Details */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {template.grips.length} grepp
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  Från {template.basePrice} kr
                </div>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="mt-4 flex items-center text-sm font-medium text-gray-800">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Vald layout
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`px-8 py-4 rounded-lg font-medium text-lg transition-all ${
            selectedTemplate
              ? 'bg-gray-800 text-white hover:bg-gray-700 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Nästa steg: Anpassa grepp →
        </button>
      </div>

      {/* Help text */}
      {!selectedTemplate && (
        <p className="text-center text-sm text-gray-500 mt-4">
          💡 Välj en layout för att fortsätta
        </p>
      )}
    </div>
  );
}