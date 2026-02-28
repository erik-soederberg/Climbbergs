export default function GripPalette({ gripTypes, onSelectGrip, selectedGrip }) {
    return (
        <div className="bg-white">
            <h3 className="text-sm font-normal mb-8 tracking-wide">GRIP TYPES</h3>

            <div className="space-y-2">
                {gripTypes.map((grip) => (
                    <button
                        key={grip.id}
                        onClick={() => onSelectGrip(grip)}
                        className={`w-full p-4 border text-left transition-all ${
                            selectedGrip?.id === grip.id
                                ? 'border-gray-900 bg-gray-50'
                                : 'border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-3 h-3"
                                style={{ backgroundColor: grip.color }}
                            ></div>

                            <div className="flex-1">
                                <div className="text-sm font-normal">{grip.name}</div>
                                <div className="text-xs text-gray-500 font-light mt-1">
                                    {grip.description}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {selectedGrip && (
                <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                    <p className="text-xs font-normal tracking-wide">
                        SELECTED: {selectedGrip.name.toUpperCase()}
                    </p>
                </div>
            )}
        </div>
    );
}