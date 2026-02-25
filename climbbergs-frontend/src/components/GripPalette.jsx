export default function GripPalette({ gripTypes, onSelectGrip, selectedGrip }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Grip Types</h3>
            <p className="text-sm text-gray-600 mb-6">
                Click a grip, then click on the board to place it
            </p>

            <div className="space-y-3">
                {gripTypes.map((grip) => (
                    <button
                        key={grip.id}
                        onClick={() => onSelectGrip(grip)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                            selectedGrip?.id === grip.id
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 hover:border-primary-300'
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            {/* Color indicator */}
                            <div
                                className="w-8 h-8 rounded-full"
                                style={{ backgroundColor: grip.color }}
                            ></div>

                            {/* Grip info */}
                            <div className="flex-1">
                                <div className="font-semibold text-gray-900">{grip.name}</div>
                                <div className="text-xs text-gray-500">{grip.description}</div>

                                {/* Show if has special properties */}
                                <div className="flex gap-2 mt-1">
                                    {grip.hasAngle && (
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      Adjustable angle
                    </span>
                                    )}
                                    {grip.hasDepth && (
                                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                      Adjustable depth
                    </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {selectedGrip && (
                <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="text-sm font-medium text-primary-900">
                        ✨ Selected: {selectedGrip.name}
                    </p>
                    <p className="text-xs text-primary-700 mt-1">
                        Click on the board to place this grip
                    </p>
                </div>
            )}
        </div>
    );
}