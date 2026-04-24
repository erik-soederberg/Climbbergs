
import useHangboardStore from '../../store/hangboardStore';

export default function GripPalette({ gripTypes, selectedGripType, onSelectGripType }) {
    const { grips, clearAll } = useHangboardStore();

    return (
        <div>
            <h3 className="text-sm font-normal mb-6 tracking-wide text-gray-300">GRIP TYPES</h3>

            <div className="space-y-3">
                {gripTypes.map(grip => (
                    <button
                        key={grip.id}
                        onClick={() => onSelectGripType(grip)}
                        className={`w-full p-4 border text-left transition-all rounded ${
                            selectedGripType?.id === grip.id
                                ? 'border-blue-600 bg-blue-900/30 ring-2 ring-blue-600'
                                : 'border-gray-700 hover:border-gray-600 bg-gray-800/30'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 flex items-center justify-center bg-gray-900/50 border border-gray-700 rounded">
                                <span className="text-xs text-gray-500">3D</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-200">{grip.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{grip.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {grips.length > 0 && (
                <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-gray-400 font-medium">
                            {grips.length} GRIP{grips.length !== 1 ? 'S' : ''}
                        </p>
                        <button
                            onClick={clearAll}
                            className="text-xs text-red-400 hover:text-red-300 font-medium"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="mt-3 space-y-1">
                        {gripTypes.map(type => {
                            const count = grips.filter(g => g.type.id === type.id).length;
                            if (count === 0) return null;
                            return (
                                <div key={type.id} className="flex justify-between text-xs text-gray-500">
                                    <span>{type.name}</span>
                                    <span>{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800 rounded">
                <p className="text-xs text-blue-400 font-medium mb-2">💡 TIPS</p>
                <ul className="text-xs text-blue-500 space-y-1">
                    <li>• Click grip to select</li>
                    <li>• Click 3D board to place</li>
                    <li>• Rotate view with mouse</li>
                    <li>• Delete with Del key</li>
                    <li>• Ctrl+Z to undo</li>
                </ul>
            </div>
        </div>
    );
}
