import { useState } from 'react';
import { X } from 'lucide-react';
import { HANGBOARD_TEMPLATES, DIFFICULTY_COLORS } from '../../constants/templates';
import useHangboardStore from '../../store/hangboardStore';

export default function TemplateSelector({ isOpen, onClose }) {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { clearAll, addGrip, setSelectedGripType } = useHangboardStore();

    if (!isOpen) return null;

    const handleLoadTemplate = (templateId) => {
        const template = HANGBOARD_TEMPLATES[templateId];

        // Clear existing grips
        clearAll();

        // Load template grips
        template.grips.forEach(gripConfig => {
            // You'll need to map grip type name to actual grip type object from API
            // For now, we'll create a mock grip
            const grip = {
                id: Date.now() + Math.random(),
                type: {
                    id: Math.random(),
                    name: gripConfig.type,
                    color: getColorForGripType(gripConfig.type),
                    hasDepth: true,
                    minDepth: 5,
                    maxDepth: 50,
                },
                x: gripConfig.x,
                y: gripConfig.y,
                size: gripConfig.size,
                rotation: gripConfig.rotation,
                depth: gripConfig.depth,
                texture: 'textured',
            };

            addGrip(grip);
        });

        onClose();
    };

    const getColorForGripType = (typeName) => {
        const colors = {
            'Jug': '#5A8F5A',
            'Crimp': '#CF4444',
            'Sloper': '#5A8FCF',
            'Pocket': '#9B5ACF',
            'Pinch': '#CF8F5A',
            'Edge': '#5ACF8F',
        };
        return colors[typeName] || '#808080';
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-light">Choose a Template</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Start with a pre-designed board or create your own
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Templates Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.values(HANGBOARD_TEMPLATES).map(template => {
                        const difficultyStyle = DIFFICULTY_COLORS[template.difficulty];

                        return (
                            <button
                                key={template.id}
                                onClick={() => handleLoadTemplate(template.id)}
                                className={`text-left border-2 p-6 rounded-lg transition-all hover:shadow-lg ${
                                    selectedTemplate === template.id
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-400'
                                }`}
                            >
                                {/* Template Preview */}
                                <div className="aspect-[3/1] bg-gray-100 rounded mb-4 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                                    <span className="relative text-xs text-gray-500 font-medium">
                    {template.grips.length > 0
                        ? `${template.grips.length} grips`
                        : 'Blank canvas'}
                  </span>
                                </div>

                                {/* Template Info */}
                                <h3 className="font-medium text-lg mb-2">{template.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">{template.description}</p>

                                {/* Difficulty Badge */}
                                <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${difficultyStyle.bg} ${difficultyStyle.border} ${difficultyStyle.text} border`}>
                  {template.difficulty.toUpperCase()}
                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                        💡 You can customize any template after loading
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 hover:bg-gray-100 transition-colors text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}