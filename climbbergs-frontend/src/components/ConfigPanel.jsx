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
        <div className="bg-white relative pl-20">
            <h3 className="text-sm font-normal mb-8 tracking-wide">PROPERTIES</h3>

            {/* Board Info */}
            <div className="mb-12 pb-8 border-b border-gray-200">
                <div className="space-y-2 text-xs text-gray-500 font-light">
                    <p>60 × 20 CM</p>
                    <p>CUSTOM MATERIAL</p>
                    <p>{gripCount} GRIPS</p>
                </div>
            </div>

            {/* Selected Grip Properties */}
            {selectedObject ? (
                <div className="mb-12 pb-8 border-b border-gray-200">
                    <h4 className="text-xs font-normal mb-6 tracking-wide">
                        {selectedObject.gripTypeName.toUpperCase()}
                    </h4>

                    {/* Angle slider */}
                    {selectedObject.hasAngle && (
                        <div className="mb-6">
                            <label className="block text-xs text-gray-500 mb-3">
                                ANGLE: {selectedObject.angle}°
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="90"
                                value={selectedObject.angle || 45}
                                onChange={(e) => handleAngleChange(e.target.value)}
                                className="w-full h-px bg-gray-300 appearance-none slider"
                            />
                        </div>
                    )}

                    {/* Depth slider */}
                    {selectedObject.hasDepth && (
                        <div className="mb-6">
                            <label className="block text-xs text-gray-500 mb-3">
                                DEPTH: {selectedObject.depth?.toFixed(1) || 0} MM
                            </label>
                            <input
                                type="range"
                                min={selectedObject.minDepth}
                                max={selectedObject.maxDepth}
                                step="0.5"
                                value={selectedObject.depth || selectedObject.minDepth}
                                onChange={(e) => handleDepthChange(e.target.value)}
                                className="w-full h-px bg-gray-300 appearance-none slider"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="mb-12 pb-8 border-b border-gray-200 text-center">
                    <p className="text-xs text-gray-400 font-light">
                        SELECT A GRIP
                    </p>
                </div>
            )}

            {/* Save Button */}
            <button
                onClick={onSave}
                disabled={gripCount === 0}
                className={`w-full text-sm tracking-wide ${
                    gripCount === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed py-4'
                        : 'btn-primary'
                }`}
            >
                {gripCount === 0 ? 'ADD GRIPS' : 'REQUEST QUOTE'}
            </button>
        </div>
    );
}