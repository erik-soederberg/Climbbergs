import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function HangboardCanvas({
                                            gripTypes,
                                            selectedGrip,
                                            onGripsChange,
                                            onSelectObject,
                                            canvasWidth = 600,
                                            canvasHeight = 200
                                        }) {
    const canvasRef = useRef(null);
    const fabricCanvasRef = useRef(null);
    const selectedGripRef = useRef(selectedGrip); // ✅ Use ref to track current grip
    const [grips, setGrips] = useState([]);

    // ✅ Update ref when selectedGrip changes
    useEffect(() => {
        console.log('🎨 Selected grip changed:', selectedGrip);
        selectedGripRef.current = selectedGrip;
    }, [selectedGrip]);

    useEffect(() => {
        console.log('🎨 Canvas useEffect - Initializing canvas');

        // Initialize Fabric canvas
        const canvas = new fabric.Canvas(canvasRef.current, {
            width: canvasWidth,
            height: canvasHeight,
            backgroundColor: '#f3f4f6',
        });

        console.log('✅ Fabric canvas created');
        fabricCanvasRef.current = canvas;

        // Draw board outline
        const board = new fabric.Rect({
            left: 0,
            top: 0,
            width: canvasWidth,
            height: canvasHeight,
            fill: '#e5e7eb',
            stroke: '#9ca3af',
            strokeWidth: 2,
            selectable: false,
            evented: false,
        });
        canvas.add(board);
        console.log('✅ Board outline added');

        // Handle canvas click to add grip
        canvas.on('mouse:down', (options) => {
            console.log('🖱️ Canvas clicked!');
            console.log('  → selectedGripRef.current:', selectedGripRef.current); // ✅ Use ref
            console.log('  → target:', options.target);

            if (selectedGripRef.current && !options.target) { // ✅ Use ref
                const pointer = canvas.getPointer(options.e);
                console.log('👆 Pointer position:', pointer);
                addGrip(pointer.x, pointer.y, selectedGripRef.current); // ✅ Pass grip as argument
            } else {
                if (!selectedGripRef.current) {
                    console.log('⚠️ No grip selected - please click a grip type first');
                }
                if (options.target) {
                    console.log('⚠️ Clicked on existing object, not adding new grip');
                }
            }
        });

        // Handle object selection
        canvas.on('selection:created', (e) => {
            if (e.selected && e.selected[0] && e.selected[0].gripData) {
                onSelectObject(e.selected[0].gripData);
            }
        });

        canvas.on('selection:updated', (e) => {
            if (e.selected && e.selected[0] && e.selected[0].gripData) {
                onSelectObject(e.selected[0].gripData);
            }
        });

        canvas.on('selection:cleared', () => {
            onSelectObject(null);
        });

        // Handle object modification
        canvas.on('object:modified', () => {
            updateGripsFromCanvas();
        });

        console.log('✅ Canvas setup complete');

        return () => {
            console.log('🗑️ Canvas cleanup');
            canvas.dispose();
        };
    }, [canvasWidth, canvasHeight]); // ✅ Don't include selectedGrip in deps

    const addGrip = (x, y, grip) => { // ✅ Accept grip as parameter
        console.log('🎯 addGrip called!', { x, y, grip });

        if (!grip || !fabricCanvasRef.current) {
            console.log('❌ Early return - missing grip or canvas');
            return;
        }

        const canvas = fabricCanvasRef.current;

        console.log('✅ Creating new grip ellipse...');

        // Create ellipse for grip
        const gripEllipse = new fabric.Ellipse({
            left: x - 25,
            top: y - 15,
            rx: 25,
            ry: 15,
            fill: grip.color,
            stroke: '#000',
            strokeWidth: 1,
            opacity: 0.8,
        });

        console.log('✅ Ellipse created');

        // Store grip data
        gripEllipse.gripData = {
            id: Date.now(),
            gripTypeId: grip.id,
            gripTypeName: grip.name,
            color: grip.color,
            hasAngle: grip.hasAngle,
            hasDepth: grip.hasDepth,
            minDepth: grip.minDepth,
            maxDepth: grip.maxDepth,
            angle: grip.hasAngle ? 45 : null,
            depth: grip.hasDepth ? (grip.minDepth + grip.maxDepth) / 2 : null,
        };

        console.log('✅ Grip data attached:', gripEllipse.gripData);

        canvas.add(gripEllipse);
        console.log('✅ Grip added to canvas');

        canvas.setActiveObject(gripEllipse);
        console.log('✅ Grip set as active object');

        canvas.renderAll();
        console.log('✅ Canvas rendered');

        updateGripsFromCanvas();
    };

    const updateGripsFromCanvas = () => {
        console.log('📊 Updating grips from canvas...');

        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;
        const objects = canvas.getObjects();

        const gripsData = objects
            .filter(obj => obj.gripData)
            .map((obj, index) => ({
                ...obj.gripData,
                positionX: obj.left || 0,
                positionY: obj.top || 0,
                width: (obj.rx || 0) * 2,
                height: (obj.ry || 0) * 2,
                rotation: obj.angle || 0,
                displayOrder: index,
            }));

        console.log('  → Grips found:', gripsData.length);

        setGrips(gripsData);
        onGripsChange(gripsData);
    };

    const deleteSelected = () => {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;

        const activeObject = canvas.getActiveObject();

        if (activeObject && activeObject.gripData) {
            canvas.remove(activeObject);
            canvas.renderAll();
            updateGripsFromCanvas();
            onSelectObject(null);
        }
    };

    const clearAll = () => {
        if (!fabricCanvasRef.current) return;
        if (!confirm('Clear all grips?')) return;

        const canvas = fabricCanvasRef.current;
        const objects = canvas.getObjects();

        objects.forEach(obj => {
            if (obj.gripData) {
                canvas.remove(obj);
            }
        });

        canvas.renderAll();
        setGrips([]);
        onGripsChange([]);
        onSelectObject(null);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Design Your Board</h3>
                <div className="space-x-2">
                    <button
                        onClick={deleteSelected}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                        Delete Selected
                    </button>
                    <button
                        onClick={clearAll}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} style={{ cursor: 'crosshair' }} />
            </div>

            <div className="mt-4 text-sm text-gray-600">
                <p>💡 Tips:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Click a grip type, then click on the board to place it</li>
                    <li>Drag grips to reposition them</li>
                    <li>Use corner handles to resize</li>
                    <li>Rotate using the circular handle</li>
                </ul>
            </div>

            {grips.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">
                        ✅ {grips.length} grip{grips.length !== 1 ? 's' : ''} placed
                    </p>
                </div>
            )}
        </div>
    );
}