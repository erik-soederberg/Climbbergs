import { MATERIALS, FINISHES, EXTRAS } from '../../../constants/templates';
import useWizardStore from '../../../store/wizardStore';

export default function Step3_MaterialSelection() {
  const {
    material,
    finish,
    extras,
    setMaterial,
    setFinish,
    toggleExtra,
    getTotalPrice,
    prevStep,
    selectedTemplate,
  } = useWizardStore();

  const totalPrice = getTotalPrice();

  const handleAddToCart = () => {
    alert(`Hangboard tillagd i varukorgen!\n\nTotalt: ${totalPrice} kr`);
    // Here you would normally add to cart and redirect
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light mb-3 text-gray-800">
          Välj Material & Finish
        </h2>
        <p className="text-gray-600">
          Välj träslag och ytbehandling för din hangboard
        </p>
      </div>

      {/* Material Selection */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Material</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(MATERIALS).map((mat) => {
            const isSelected = material === mat.id;

            return (
              <button
                key={mat.id}
                onClick={() => setMaterial(mat.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? 'border-gray-800 bg-gray-50 shadow-md'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                {/* Color preview */}
                <div
                  className="w-full h-16 rounded mb-3"
                  style={{ backgroundColor: mat.color }}
                />

                <h4 className="font-semibold text-gray-800 mb-1">
                  {mat.name}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {mat.description}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {mat.price > 0 ? `+${mat.price} kr` : 'Inkluderat'}
                </p>

                {isSelected && (
                  <div className="mt-2 flex items-center text-xs font-medium text-green-700">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Valt
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Finish Selection */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Ytbehandling
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(FINISHES).map((fin) => {
            const isSelected = finish === fin.id;

            return (
              <button
                key={fin.id}
                onClick={() => setFinish(fin.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  isSelected
                    ? 'border-gray-800 bg-gray-50 shadow-md'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                <h4 className="font-semibold text-gray-800 mb-1">
                  {fin.name}
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  {fin.description}
                </p>
                <p className="text-sm font-medium text-gray-800">
                  {fin.price > 0
                    ? `+${fin.price} kr`
                    : fin.price < 0
                    ? `${fin.price} kr`
                    : 'Inkluderat'}
                </p>

                {isSelected && (
                  <div className="mt-2 flex items-center text-xs font-medium text-green-700">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Valt
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Extras */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Tillbehör (Valfritt)
        </h3>
        <div className="space-y-3">
          {Object.values(EXTRAS).map((extra) => {
            const isSelected = extras.includes(extra.id);

            return (
              <button
                key={extra.id}
                onClick={() => toggleExtra(extra.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-gray-800 bg-gray-50'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      isSelected
                        ? 'border-gray-800 bg-gray-800'
                        : 'border-gray-400'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {extra.name}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {extra.description}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  {extra.price > 0 ? `+${extra.price} kr` : 'Gratis'}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-gray-800 text-white p-6 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg">Bastpris ({selectedTemplate?.name}):</span>
          <span className="text-lg">{selectedTemplate?.basePrice} kr</span>
        </div>

        {MATERIALS[material].price > 0 && (
          <div className="flex justify-between items-center mb-4 text-sm opacity-80">
            <span>Material ({MATERIALS[material].name}):</span>
            <span>+{MATERIALS[material].price} kr</span>
          </div>
        )}

        {FINISHES[finish].price !== 0 && (
          <div className="flex justify-between items-center mb-4 text-sm opacity-80">
            <span>Finish ({FINISHES[finish].name}):</span>
            <span>
              {FINISHES[finish].price > 0 ? '+' : ''}
              {FINISHES[finish].price} kr
            </span>
          </div>
        )}

        {extras.map((extraId) => (
          <div
            key={extraId}
            className="flex justify-between items-center mb-4 text-sm opacity-80"
          >
            <span>{EXTRAS[extraId].name}:</span>
            <span>+{EXTRAS[extraId].price} kr</span>
          </div>
        ))}

        <div className="border-t border-white/20 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-semibold">TOTALT:</span>
            <span className="text-3xl font-bold">{totalPrice} kr</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="px-6 py-3 border-2 border-gray-800 text-gray-800 hover:bg-gray-100 rounded-lg font-medium transition-colors"
        >
          ← Tillbaka
        </button>

        <button
          onClick={handleAddToCart}
          className="px-8 py-4 bg-green-600 text-white hover:bg-green-700 rounded-lg font-semibold text-lg transition-colors shadow-lg"
        >
          Lägg till i varukorg ({totalPrice} kr)
        </button>
      </div>
    </div>
  );
}