import { useState, useRef, useEffect } from 'react';
import { hangboardApi } from '../services/api';

// Grip shape renderer component
const GripShape = ({ grip, isSelected }) => {
    const commonStyles = {
        position: 'absolute',
        left: `${grip.x - grip.size / 2}px`,
        top: `${grip.y - grip.size / 2}px`,
        transform: `rotate(${grip.rotation}deg)`,
        cursor: 'move',
        transition: 'all 0.2s',
    };

    const borderStyle = isSelected
        ? '3px solid white'
        : '2px solid rgba(0,0,0,0.3)';

    const shadowStyle = isSelected
        ? '0 0 0 3px rgba(255,193,7,0.6), 0 4px 8px rgba(0,0,0,0.3)'
        : '0 2px 4px rgba(0,0,0,0.2)';

    // Jug - Large positive hold (oval shape)
    if (grip.type.name === 'Jug') {
        return (
            <div
                style={{
                    ...commonStyles,
                    width: `${grip.size * 1.5}px`,
                    height: `${grip.size}px`,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${grip.type.color}, ${adjustColor(grip.type.color, -30)})`,
                    border: borderStyle,
                    boxShadow: shadowStyle,
                }}
            >
                {/* Lip/edge indicator */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '10%',
                        right: '10%',
                        height: '3px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '2px',
                    }}
                />
            </div>
        );
    }

    // Crimp - Small edge (rectangular)
    if (grip.type.name === 'Crimp') {
        return (
            <div
                style={{
                    ...commonStyles,
                    width: `${grip.size * 1.2}px`,
                    height: `${grip.size * 0.4}px`,
                    borderRadius: '4px',
                    background: `linear-gradient(180deg, ${grip.type.color}, ${adjustColor(grip.type.color, -40)})`,
                    border: borderStyle,
                    boxShadow: shadowStyle,
                }}
            >
                {/* Edge detail */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '5%',
                        right: '5%',
                        height: '40%',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '2px 2px 0 0',
                    }}
                />
            </div>
        );
    }

    // Sloper - Rounded hold
    if (grip.type.name === 'Sloper') {
        return (
            <div
                style={{
                    ...commonStyles,
                    width: `${grip.size}px`,
                    height: `${grip.size * 0.7}px`,
                    borderRadius: '50% 50% 45% 45%',
                    background: `radial-gradient(ellipse at 50% 30%, ${adjustColor(grip.type.color, 20)}, ${grip.type.color})`,
                    border: borderStyle,
                    boxShadow: shadowStyle,
                }}
            />
        );
    }

    // Pocket - Circular with center hole
    if (grip.type.name === 'Pocket') {
        return (
            <div
                style={{
                    ...commonStyles,
                    width: `${grip.size}px`,
                    height: `${grip.size}px`,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${adjustColor(grip.type.color, -30)} 0%, ${grip.type.color} 40%, ${adjustColor(grip.type.color, -20)} 100%)`,
                    border: borderStyle,
                    boxShadow: shadowStyle,
                }}
            >
                {/* Pocket hole */}
                <div
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '30%',
                        width: '40%',
                        height: '40%',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #1a1a1a, #2a2a2a)',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
                    }}
                />
            </div>
        );
    }

    // Pinch - Vertical narrow shape
    if (grip.type.name === 'Pinch') {
        return (
            <div
                style={{
                    ...commonStyles,
                    width: `${grip.size * 0.5}px`,
                    height: `${grip.size * 1.2}px`,
                    borderRadius: `${grip.size * 0.25}px`,
                    background: `linear-gradient(90deg, ${adjustColor(grip.type.color, -20)}, ${grip.type.color}, ${adjustColor(grip.type.color, -20)})`,
                    border: borderStyle,
                    boxShadow: shadowStyle,
                }}
            >
                {/* Texture lines */}
                <div style={{ position: 'absolute', top: '20%', left: '45%', width: '10%', height: '60%', background: 'rgba(0,0,0,0.1)' }} />
            </div>
        );
    }

    // Edge - Flat horizontal hold
    if (grip.type.name === 'Edge') {
        return (
            <div
                style={{
                    ...commonStyles,
                    width: `${grip.size * 1.3}px`,
                    height: `${grip.size * 0.5}px`,
                    borderRadius: '6px',
                    background: `linear-gradient(180deg, ${adjustColor(grip.type.color, 10)}, ${grip.type.color}, ${adjustColor(grip.type.color, -30)})`,
                    border: borderStyle,
                    boxShadow: shadowStyle,
                }}
            >
                {/* Edge detail */}
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        height: '50%',
                        background: 'rgba(255,255,255,0.15)',
                        borderRadius: '6px 6px 0 0',
                    }}
                />
            </div>
        );
    }

    // Default fallback
    return (
        <div
            style={{
                ...commonStyles,
                width: `${grip.size}px`,
                height: `${grip.size}px`,
                borderRadius: '50%',
                backgroundColor: grip.type.color,
                border: borderStyle,
                boxShadow: shadowStyle,
            }}
        />
    );
};

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function HangboardBuilder() {
    const [gripTypes, setGripTypes] = useState([]);
    const [selectedGripType, setSelectedGripType] = useState(null);
    const [placedGrips, setPlacedGrips] = useState([]);
    const [selectedGrip, setSelectedGrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        loadGripTypes();
    }, []);

    const loadGripTypes = async () => {
        try {
            const data = await hangboardApi.getGripTypes();
            setGripTypes(data);
        } catch (err) {
            console.error('Failed to load grip types:', err);
            alert('Failed to load grip types. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    const handleCanvasClick = (e) => {
        if (!selectedGripType) {
            alert('Select a grip type first!');
            return;
        }

        if (e.target !== canvasRef.current) {
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newGrip = {
            id: Date.now(),
            type: selectedGripType,
            x,
            y,
            size: 40,
            rotation: 0,
        };

        setPlacedGrips([...placedGrips, newGrip]);
    };

    const handleGripMouseDown = (e, gripId) => {
        e.stopPropagation();
        const grip = placedGrips.find(g => g.id === gripId);
        setSelectedGrip(grip);

        const rect = canvasRef.current.getBoundingClientRect();

        const onMouseMove = (moveEvent) => {
            const x = moveEvent.clientX - rect.left;
            const y = moveEvent.clientY - rect.top;

            setPlacedGrips(prev =>
                prev.map(g =>
                    g.id === gripId ? { ...g, x, y } : g
                )
            );

            // Update selected grip position in real-time
            setSelectedGrip(prev => prev?.id === gripId ? { ...prev, x, y } : prev);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const deleteGrip = () => {
        if (selectedGrip) {
            setPlacedGrips(prev => prev.filter(g => g.id !== selectedGrip.id));
            setSelectedGrip(null);
        }
    };

    const clearAll = () => {
        if (confirm('Clear all grips?')) {
            setPlacedGrips([]);
            setSelectedGrip(null);
        }
    };

    const updateGripSize = (newSize) => {
        if (selectedGrip) {
            setPlacedGrips(prev =>
                prev.map(g =>
                    g.id === selectedGrip.id ? { ...g, size: newSize } : g
                )
            );
            setSelectedGrip({ ...selectedGrip, size: newSize });
        }
    };

    const updateGripRotation = (newRotation) => {
        if (selectedGrip) {
            setPlacedGrips(prev =>
                prev.map(g =>
                    g.id === selectedGrip.id ? { ...g, rotation: newRotation } : g
                )
            );
            setSelectedGrip({ ...selectedGrip, rotation: newRotation });
        }
    };

    const handleSave = () => {
        if (placedGrips.length === 0) {
            alert('Add at least one grip before requesting a quote!');
            return;
        }
        alert('Save functionality - connect to backend!\n\nGrips: ' + placedGrips.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading builder...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-8 py-16 text-center">
                    <h1 className="text-5xl font-light mb-4 tracking-tight">
                        Design Your Hangboard
                    </h1>
                    <p className="text-lg text-gray-500 font-light">
                        Select a grip type • Click to place • Drag to move • Customize
                    </p>
                </div>
            </div>

            {/* Main Builder */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Grip Palette - 3 columns */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-normal mb-6 tracking-wide">GRIP TYPES</h3>
                        <div className="space-y-3">
                            {gripTypes.map(grip => (
                                <button
                                    key={grip.id}
                                    onClick={() => setSelectedGripType(grip)}
                                    className={`w-full p-4 border text-left transition-all ${
                                        selectedGripType?.id === grip.id
                                            ? 'border-gray-900 bg-gray-50'
                                            : 'border-gray-200 hover:border-gray-400'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Visual grip preview */}
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <GripShape
                                                grip={{ type: grip, size: 30, x: 24, y: 24, rotation: 0, id: `preview-${grip.id}` }}
                                                isSelected={false}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{grip.name}</p>
                                            <p className="text-xs text-gray-500">{grip.description}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {placedGrips.length > 0 && (
                            <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                                <p className="text-xs text-gray-500 mb-2">
                                    {placedGrips.length} GRIPS PLACED
                                </p>
                                <button onClick={clearAll} className="text-xs text-red-500 hover:text-red-700">
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Canvas - 6 columns */}
                    <div className="lg:col-span-6">
                        <h3 className="text-sm font-normal mb-6 tracking-wide">HANGBOARD DESIGN</h3>

                        <div
                            ref={canvasRef}
                            onClick={handleCanvasClick}
                            className="relative border-2 border-gray-300 cursor-crosshair overflow-hidden shadow-lg"
                            style={{
                                width: '100%',
                                aspectRatio: '3 / 1',
                                maxWidth: '600px',
                                maxHeight: '200px',
                                margin: '0 auto',
                                backgroundImage: 'url(/images/hangboard-blueprint.svg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {placedGrips.map(grip => (
                                <div
                                    key={grip.id}
                                    onMouseDown={(e) => handleGripMouseDown(e, grip.id)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedGrip(grip);
                                    }}
                                >
                                    <GripShape grip={grip} isSelected={selectedGrip?.id === grip.id} />
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-gray-400 mt-4 text-center font-light">
                            60 × 20 CM CUSTOM TRAINING BOARD
                        </p>
                    </div>

                    {/* Properties - 3 columns */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-normal mb-6 tracking-wide">PROPERTIES</h3>

                        {selectedGrip ? (
                            <div className="space-y-6">
                                <div>
                                    <p className="text-xs text-gray-500 mb-3">
                                        TYPE: {selectedGrip.type.name.toUpperCase()}
                                    </p>
                                    <div className="relative w-full h-20 bg-gray-50 border border-gray-200 flex items-center justify-center">
                                        <GripShape
                                            grip={{ ...selectedGrip, x: 60, y: 40, rotation: 0 }}
                                            isSelected={false}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-2">
                                        SIZE: {selectedGrip.size}px
                                    </label>
                                    <input
                                        type="range"
                                        min="25"
                                        max="70"
                                        value={selectedGrip.size}
                                        onChange={(e) => updateGripSize(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-500 mb-2">
                                        ROTATION: {selectedGrip.rotation}°
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={selectedGrip.rotation}
                                        onChange={(e) => updateGripRotation(parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                {selectedGrip.type.hasDepth && (
                                    <div className="p-3 bg-gray-50 border border-gray-200">
                                        <p className="text-xs text-gray-600 font-medium">DEPTH RANGE</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {selectedGrip.type.minDepth}-{selectedGrip.type.maxDepth}mm
                                        </p>
                                    </div>
                                )}

                                {selectedGrip.type.hasAngle && (
                                    <div className="p-3 bg-gray-50 border border-gray-200">
                                        <p className="text-xs text-gray-600 font-medium">ADJUSTABLE ANGLE</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Sloper angle customizable
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={deleteGrip}
                                    className="w-full py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-sm"
                                >
                                    DELETE GRIP
                                </button>
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400 text-center py-8">
                                Select a grip to customize
                            </p>
                        )}

                        <button
                            onClick={handleSave}
                            disabled={placedGrips.length === 0}
                            className={`w-full mt-8 py-3 text-sm transition-colors ${
                                placedGrips.length === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-900 text-white hover:bg-gray-700'
                            }`}
                        >
                            {placedGrips.length === 0 ? 'ADD GRIPS' : 'REQUEST QUOTE'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}