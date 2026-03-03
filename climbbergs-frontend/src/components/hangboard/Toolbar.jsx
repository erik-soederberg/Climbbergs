import { Undo2, Redo2, Copy, FlipHorizontal, Layers, Download, Grid3x3 } from 'lucide-react';
import useHangboardStore, { useUndo, useRedo, useCanUndo, useCanRedo } from '../../store/hangboardStore';

export default function Toolbar() {
    const {
        selectedGripId,
        duplicateGrip,
        snapToGrid,
        toggleSnapToGrid,
        symmetryMode,
        toggleSymmetry,
        viewMode,
        toggleViewMode,
    } = useHangboardStore();

    const undo = useUndo();
    const redo = useRedo();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const handleExport = () => {
        // Will implement in step 15
        console.log('Export functionality');
    };

    return (
        <div className="flex items-center gap-2 p-4 bg-gray-50 border-b border-gray-200">
            {/* Undo/Redo */}
            <div className="flex gap-1 border-r border-gray-300 pr-2">
                <button
                    onClick={undo}
                    disabled={!canUndo}
                    className="p-2 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Undo (Ctrl+Z)"
                >
                    <Undo2 size={18} />
                </button>
                <button
                    onClick={redo}
                    disabled={!canRedo}
                    className="p-2 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Redo (Ctrl+Y)"
                >
                    <Redo2 size={18} />
                </button>
            </div>

            {/* Duplicate */}
            <button
                onClick={() => selectedGripId && duplicateGrip(selectedGripId)}
                disabled={!selectedGripId}
                className="p-2 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                title="Duplicate (Ctrl+D)"
            >
                <Copy size={18} />
            </button>

            {/* Snap to Grid */}
            <button
                onClick={toggleSnapToGrid}
                className={`p-2 hover:bg-gray-200 ${snapToGrid ? 'bg-blue-100 text-blue-600' : ''}`}
                title="Snap to Grid"
            >
                <Grid3x3 size={18} />
            </button>

            {/* Symmetry Mode */}
            <button
                onClick={toggleSymmetry}
                className={`p-2 hover:bg-gray-200 ${symmetryMode ? 'bg-purple-100 text-purple-600' : ''}`}
                title="Symmetry Mode"
            >
                <FlipHorizontal size={18} />
            </button>

            {/* View Mode Toggle */}
            <div className="border-l border-gray-300 pl-2 ml-auto">
                <button
                    onClick={toggleViewMode}
                    className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 text-sm"
                >
                    {viewMode === '2D' ? 'Switch to 3D' : 'Switch to 2D'}
                </button>
            </div>

            {/* Export */}
            <button
                onClick={handleExport}
                className="p-2 hover:bg-gray-200"
                title="Export Image"
            >
                <Download size={18} />
            </button>
        </div>
    );
}