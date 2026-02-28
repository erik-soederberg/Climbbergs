export default function ConfigPanel({
                                        selectedObject,
                                        onUpdateGrip,
                                        gripCount,
                                        basePrice = 0,
                                        onSave
                                    }) {

    const handleAngleChange = (newAngle) => {
        if (selectedObject) {
            onUpdateGrip({ ...selectedObject, angle: parseInt(newAngle) });
        }
    };

    const handleDepthChange = (newDepth) => {
        if (selectedObject) {
            onUpdateGrip({ ...selectedObject, depth: parseFloat(newDepth) });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Configuration</h3>

            {/* Board Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Board Specs</h4>
                <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Size:</span> 60 x 20 cm</p>
                    <p><span className="font-medium">Material:</span> Custom</p>
                    <p><span className="font-medium">Grips:</span> {gripCount}</p>
                </div>
            </div>

            {/* Selected Grip Properties */}
            {selectedObject ? (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <h4 className="font-semibold mb-3 text-primary-900">
                        Selected: {selectedObject.gripTypeName}
                    </h4>

                    {/* Angle slider for slopers */}
                    {selectedObject.hasAngle && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Angle: {selectedObject.angle}°
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="90"
                                value={selectedObject.angle || 45}
                                onChange={(e) => handleAngleChange(e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                                <span>0° (flat)</span>
                                <span>90° (vertical)</span>
                            </div>
                        </div>
                    )}

                    {/* Depth slider for pockets/crimps */}
                    {selectedObject.hasDepth && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Depth: {selectedObject.depth?.toFixed(1) || 0} mm
                            </label>
                            <input
                                type="range"
                                min={selectedObject.minDepth}
                                max={selectedObject.maxDepth}
                                step="0.5"
                                value={selectedObject.depth || selectedObject.minDepth}
                                onChange={(e) => handleDepthChange(e.target.value)}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-600 mt-1">
                                <span>{selectedObject.minDepth}mm</span>
                                <span>{selectedObject.maxDepth}mm</span>
                            </div>
                        </div>
                    )}

                    <p className="text-xs text-gray-600 mt-3">
                        Drag grip to move • Use handles to resize/rotate
                    </p>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg text-center text-gray-500 text-sm">
                    Select a grip to adjust its properties
                </div>
            )}

            {/* Price Display */}
            <div className="mb-6 p-4 bg-accent-light rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Estimated Price:</span>
                    <span className="text-2xl font-bold text-gray-900">
            {basePrice > 0 ? `$${basePrice.toFixed(2)}` : 'Contact for quote'}
          </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                    All grips included • No extra charges
                </p>
            </div>

            {/* Save Button */}
            <button
                onClick={onSave}
                disabled={gripCount === 0}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors ${
                    gripCount === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'btn-accent'
                }`}
            >
                {gripCount === 0 ? 'Add grips to save' : 'Save & Get Quote'}
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
                We'll contact you within 24 hours with a detailed quote
            </p>
        </div>
    );
}