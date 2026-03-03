import { useEffect, useRef, useState } from 'react';
import { hangboardApi } from '../services/api';
import useHangboardStore from '../store/hangboardStore';
import { snapGripToGrid } from '../utils/gridSnap';
import { getGripsWithMirrors } from '../utils/symmetry';
import GripShape2D from '../components/hangboard/GripShape2D';
import GripPalette from '../components/hangboard/GripPalette';
import Toolbar from '../components/hangboard/Toolbar';

export default function HangboardBuilder() {
    const canvasRef = useRef(null);
    const [gripTypesFromAPI, setGripTypesFromAPI] = useState([]);
    const [loading, setLoading] = useState(true);

    // Zustand store
    const {
        grips,
        selectedGripId,
        selectedGripType,
        snapToGrid,
        gridSize,
        symmetryMode,
        addGrip,
        updateGrip,
        selectGrip,
        setSelectedGripType,
    } = useHangboardStore();

    // Load grip types from API
    useEffect(() => {
        loadGripTypes();
        setupKeyboardShortcuts();

        return () => {
            removeKeyboardShortcuts();
        };
    }, []);

    const loadGripTypes = async () => {
        try {
            const data = await hangboardApi.getGripTypes();
            setGripTypesFromAPI(data);
        } catch (err) {
            console.error('Failed to load grip types:', err);
            alert('Failed to load grip types. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    // Keyboard shortcuts
    const setupKeyboardShortcuts = () => {
        window.addEventListener('keydown', handleKeyDown);
    };

    const removeKeyboardShortcuts = () => {
        window.removeEventListener('keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
        // Ctrl/Cmd + Z = Undo
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            useHangboardStore.temporal.getState().undo();
        }

        // Ctrl/Cmd + Shift + Z = Redo (or Ctrl+Y)
        if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
            e.preventDefault();
            useHangboardStore.temporal.getState().redo();
        }

        // Ctrl/Cmd + D = Duplicate
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            if (selectedGripId) {
                useHangboardStore.getState().duplicateGrip(selectedGripId);
            }
        }

        // Delete/Backspace = Delete grip
        if ((e.key === 'Delete' || e.key === 'Backspace') && selectedGripId) {
            e.preventDefault();
            useHangboardStore.getState().deleteGrip(selectedGripId);
        }
    };

    // Handle canvas click to place grip
    const handleCanvasClick = (e) => {
        if (!selectedGripType) {
            alert('Select a grip type first!');
            return;
        }

        // Only place on canvas background, not on grips
        if (e.target !== canvasRef.current) {
            return;
        }

        const rect = canvasRef.current.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Apply snap to grid
        if (snapToGrid) {
            x = Math.round(x / gridSize) * gridSize;
            y = Math.round(y / gridSize) * gridSize;
        }

        const newGrip = {
            id: Date.now(),
            type: selectedGripType,
            x,
            y,
            size: 40,
            rotation: 0,
            depth: selectedGripType.hasDepth ? (selectedGripType.minDepth + selectedGripType.maxDepth) / 2 : 0,
            texture: 'smooth', // Default texture
            layer: 'foreground',
        };

        addGrip(newGrip);
    };

    // Handle grip drag
    const handleGripMouseDown = (e, gripId) => {
        e.stopPropagation();
        selectGrip(gripId);

        const rect = canvasRef.current.getBoundingClientRect();
        const startX = e.clientX;
        const startY = e.clientY;
        const grip = grips.find(g => g.id === gripId);
        const startGripX = grip.x;
        const startGripY = grip.y;

        const onMouseMove = (moveEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaY = moveEvent.clientY - startY;

            let newX = startGripX + deltaX;
            let newY = startGripY + deltaY;

            // Apply snap to grid
            if (snapToGrid) {
                newX = Math.round(newX / gridSize) * gridSize;
                newY = Math.round(newY / gridSize) * gridSize;
            }

            updateGrip(gripId, { x: newX, y: newY });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    // Get grips with symmetry applied
    const displayGrips = getGripsWithMirrors(grips, 600, symmetryMode);

    // Selected grip data
    const selectedGrip = grips.find(g => g.id === selectedGripId);

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
                        Professional hangboard designer with advanced features
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <Toolbar />

            {/* Main Builder */}
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Grip Palette - 3 columns */}
                    <div className="lg:col-span-3">
                        <GripPalette
                            gripTypes={gripTypesFromAPI}
                            selectedGripType={selectedGripType}
                            onSelectGripType={setSelectedGripType}
                        />
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
                            {/* Grid overlay when snap is enabled */}
                            {snapToGrid && (
                                <svg
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {Array.from({ length: Math.ceil(600 / gridSize) }).map((_, i) => (
                                        <line
                                            key={`v-${i}`}
                                            x1={i * gridSize}
                                            y1={0}
                                            x2={i * gridSize}
                                            y2={200}
                                            stroke="rgba(100, 181, 246, 0.2)"
                                            strokeWidth="1"
                                        />
                                    ))}
                                    {Array.from({ length: Math.ceil(200 / gridSize) }).map((_, i) => (
                                        <line
                                            key={`h-${i}`}
                                            x1={0}
                                            y1={i * gridSize}
                                            x2={600}
                                            y2={i * gridSize}
                                            stroke="rgba(100, 181, 246, 0.2)"
                                            strokeWidth="1"
                                        />
                                    ))}
                                </svg>
                            )}

                            {/* Symmetry center line */}
                            {symmetryMode && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: 0,
                                        bottom: 0,
                                        width: '2px',
                                        background: 'rgba(156, 39, 176, 0.5)',
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}

                            {/* Placed grips */}
                            {displayGrips.map(grip => (
                                <div
                                    key={grip.id}
                                    onMouseDown={(e) => !grip.isMirrored && handleGripMouseDown(e, grip.id)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!grip.isMirrored) {
                                            selectGrip(grip.id);
                                        }
                                    }}
                                    style={{
                                        opacity: grip.isMirrored ? 0.6 : 1,
                                        pointerEvents: grip.isMirrored ? 'none' : 'auto',
                                    }}
                                >
                                    <GripShape2D
                                        grip={grip}
                                        isSelected={selectedGripId === grip.id}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                            <span>60 × 20 CM CUSTOM TRAINING BOARD</span>
                            <span>{grips.length} GRIPS PLACED</span>
                        </div>
                    </div>

                    {/* Properties Panel - 3 columns */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-normal mb-6 tracking-wide">PROPERTIES</h3>

                        {selectedGrip ? (
                            <PropertiesPanel grip={selectedGrip} />
                        ) : (
                            <div className="text-center py-12 text-gray-400 text-sm">
                                <p>Select a grip to customize</p>
                                <p className="mt-2 text-xs">Click on any grip or place a new one</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Properties Panel Component (inline for now)
function PropertiesPanel({ grip }) {
    const { updateGrip, deleteGrip } = useHangboardStore();

    return (
        <div className="space-y-6">
            {/* Grip Type Display */}
            <div>
                <p className="text-xs text-gray-500 mb-3">
                    TYPE: {grip.type.name.toUpperCase()}
                </p>
                <div className="relative w-full h-20 bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <GripShape2D
                        grip={{ ...grip, x: 60, y: 40, rotation: 0 }}
                        isSelected={false}
                    />
                </div>
            </div>

            {/* Size Slider */}
            <div>
                <label className="block text-xs text-gray-500 mb-2">
                    SIZE: {grip.size}px
                </label>
                <input
                    type="range"
                    min="25"
                    max="70"
                    value={grip.size}
                    onChange={(e) => updateGrip(grip.id, { size: parseInt(e.target.value) })}
                    className="w-full"
                />
            </div>

            {/* Rotation Slider */}
            <div>
                <label className="block text-xs text-gray-500 mb-2">
                    ROTATION: {grip.rotation}°
                </label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={grip.rotation}
                    onChange={(e) => updateGrip(grip.id, { rotation: parseInt(e.target.value) })}
                    className="w-full"
                />
            </div>

            {/* Depth Slider (if applicable) */}
            {grip.type.hasDepth && (
                <div>
                    <label className="block text-xs text-gray-500 mb-2">
                        DEPTH: {grip.depth}mm
                    </label>
                    <input
                        type="range"
                        min={grip.type.minDepth}
                        max={grip.type.maxDepth}
                        value={grip.depth}
                        onChange={(e) => updateGrip(grip.id, { depth: parseInt(e.target.value) })}
                        className="w-full"
                    />
                </div>
            )}

            {/* Texture Selection */}
            <div>
                <label className="block text-xs text-gray-500 mb-2">
                    TEXTURE
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {['smooth', 'textured', 'aggressive'].map(texture => (
                        <button
                            key={texture}
                            onClick={() => updateGrip(grip.id, { texture })}
                            className={`py-2 text-xs border transition-colors ${
                                grip.texture === texture
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-300 hover:border-gray-500'
                            }`}
                        >
                            {texture.toUpperCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Info boxes */}
            {grip.type.hasAngle && (
                <div className="p-3 bg-blue-50 border border-blue-200">
                    <p className="text-xs text-blue-800 font-medium">ADJUSTABLE ANGLE</p>
                    <p className="text-xs text-blue-600 mt-1">
                        This grip supports angle adjustments
                    </p>
                </div>
            )}

            {/* Delete Button */}
            <button
                onClick={() => deleteGrip(grip.id)}
                className="w-full py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors text-sm"
            >
                DELETE GRIP
            </button>
        </div>
    );
}