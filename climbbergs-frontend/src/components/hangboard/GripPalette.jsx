import GripShape2D from './GripShape2D';
import useHangboardStore from '../../store/hangboardStore';

export default function GripPalette({ gripTypes, selectedGripType, onSelectGripType }) {
    const { grips, clearAll } = useHangboardStore();

    return (
        <div>
            <h3 className="text-sm font-normal mb-6 tracking-wide">GRIP TYPES</h3>

            <div className="space-y-3">
                {gripTypes.map(grip => (
                    <button
                        key={grip.id}
                        onClick={() => onSelectGripType(grip)}
                        className={`w-full p-4 border text-left transition-all ${
                            selectedGripType?.id === grip.id
                                ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900'
                                : 'border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {/* Visual grip preview */}
                            <div className="relative w-12 h-12 flex items-center justify-center bg-white border border-gray-100">
                                <GripShape2D
                                    grip={{
                                        type: grip,
                                        size: 28,
                                        x: 24,
                                        y: 24,
                                        rotation: 0,
                                        depth: grip.hasDepth ? (grip.minDepth + grip.maxDepth) / 2 : 0,
                                        id: `preview-${grip.id}`
                                    }}
                                    isSelected={false}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{grip.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">{grip.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Stats & Actions */}
            {grips.length > 0 && (
                <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-gray-600 font-medium">
                            {grips.length} GRIP{grips.length !== 1 ? 'S' : ''}
                        </p>
                        <button
                            onClick={clearAll}
                            className="text-xs text-red-500 hover:text-red-700 font-medium"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Grip type breakdown */}
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

            {/* Tips */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200">
                <p className="text-xs text-blue-800 font-medium mb-2">💡 TIPS</p>
                <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Click to place grips</li>
                    <li>• Drag to reposition</li>
                    <li>• Press Delete to remove</li>
                    <li>• Ctrl+Z to undo</li>
                    <li>• Ctrl+D to duplicate</li>
                </ul>
            </div>
        </div>
    );
}
