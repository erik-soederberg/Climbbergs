import { useState } from 'react';
import useWizardStore from '../../../store/wizardStore';
import GripShape2D from './GripShape2D';

export default function Step2_GripCustomization() {
  const {
    grips,
    selectedGripId,
    selectGrip,
    updateGrip,
    deleteGrip,
    nextStep,
    prevStep,
  } = useWizardStore();

  const selectedGrip = grips.find((g) => g.id === selectedGripId);

  const handleCanvasClick = (e) => {
    // Deselect if clicking on canvas background
    if (e.target.classList.contains('canvas-background')) {
      selectGrip(null);
    }
  };

  const handleGripClick = (gripId) => {
    selectGrip(gripId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light mb-3 text-gray-800">
          Anpassa Dina Grepp
        </h2>
        <p className="text-gray-600">
          Klicka på ett grepp för att ändra storlek, djup och textur
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas - 8 columns */}
        <div className="lg:col-span-8">
          <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-lg">
            {/* Canvas */}
            <div
              onClick={handleCanvasClick}
              className="canvas-background relative mx-auto"
              style={{
                width: '100%',
                maxWidth: '600px',
                aspectRatio: '3 / 1',
                backgroundImage: 'url(/images/hangboard-blueprint.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Grips */}
              {grips.map((grip) => (
                <div
                  key={grip.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGripClick(grip.id);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <GripShape2D
                    grip={grip}
                    isSelected={selectedGripId === grip.id}
                  />
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>{grips.length} grepp på brädan</p>
            </div>
          </div>
        </div>

        {/* Properties Panel - 4 columns */}
        <div className="lg:col-span-4">
          <div className="bg-[#F5F3ED] border-2 border-[#D4CFC5] rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Grepp-inställningar
            </h3>

            {selectedGrip ? (
              <div className="space-y-6">
                {/* Grip Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    TYP
                  </label>
                  <div className="p-3 bg-white rounded border border-gray-300">
                    <p className="font-medium text-gray-800">
                      {selectedGrip.type}
                    </p>
                  </div>
                </div>

                {/* Size Slider */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    STORLEK: {selectedGrip.size}mm
                  </label>
                  <input
                    type="range"
                    min="25"
                    max="70"
                    value={selectedGrip.size}
                    onChange={(e) =>
                      updateGrip(selectedGrip.id, {
                        size: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-gray-800"
                  />
                </div>

                {/* Rotation Slider */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    ROTATION: {selectedGrip.rotation}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedGrip.rotation}
                    onChange={(e) =>
                      updateGrip(selectedGrip.id, {
                        rotation: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-gray-800"
                  />
                </div>

                {/* Depth Slider */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    DJUP: {selectedGrip.depth}mm
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={selectedGrip.depth}
                    onChange={(e) =>
                      updateGrip(selectedGrip.id, {
                        depth: parseInt(e.target.value),
                      })
                    }
                    className="w-full accent-gray-800"
                  />
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => {
                    deleteGrip(selectedGrip.id);
                    selectGrip(null);
                  }}
                  className="w-full py-2 border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors rounded font-medium"
                >
                  Ta bort grepp
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-3 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <p className="text-sm">Inget grepp valt</p>
                <p className="text-xs mt-2">
                  Klicka på ett grepp för att anpassa det
                </p>
              </div>
            )}

            {/* Tips */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-xs text-blue-800 font-medium mb-2">
                💡 TIPS
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Klicka på grepp för att välja</li>
                <li>• Justera storlek och djup</li>
                <li>• Rotera för bättre placering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-12 max-w-7xl mx-auto">
        <button
          onClick={prevStep}
          className="px-6 py-3 border-2 border-gray-800 text-gray-800 hover:bg-gray-100 rounded-lg font-medium transition-colors"
        >
          ← Tillbaka
        </button>

        <button
          onClick={nextStep}
          className="px-8 py-3 bg-gray-800 text-white hover:bg-gray-700 rounded-lg font-medium transition-colors shadow-lg"
        >
          Nästa steg: Material & Färg →
        </button>
      </div>
    </div>
  );
}