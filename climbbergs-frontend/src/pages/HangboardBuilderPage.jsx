import { useState, useEffect } from 'react';
import { hangboardApi } from '../services/api';
import GripPalette from '../components/GripPalette';
import HangboardCanvas from '../components/HangboardCanvas';
import ConfigPanel from '../components/ConfigPanel';
import { v4 as uuidv4 } from 'uuid';

export default function HangboardBuilderPage() {
    const [gripTypes, setGripTypes] = useState([]);
    const [hangboardBase, setHangboardBase] = useState(null);
    const [selectedGrip, setSelectedGrip] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [grips, setGrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contactInfo, setContactInfo] = useState({ name: '', email: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadData();
        ensureSessionId();
    }, []);

    const ensureSessionId = () => {
        let sessionId = localStorage.getItem('climbbergs_session');
        if (!sessionId) {
            sessionId = uuidv4();
            localStorage.setItem('climbbergs_session', sessionId);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const [gripTypesData, basesData] = await Promise.all([
                hangboardApi.getGripTypes(),
                hangboardApi.getBases(),
            ]);

            setGripTypes(gripTypesData);
            setHangboardBase(basesData[0]); // Use first (and only) base
        } catch (err) {
            console.error('Failed to load data:', err);
            alert('Failed to load hangboard data. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    const handleGripsChange = (newGrips) => {
        setGrips(newGrips);
    };

    const handleUpdateGrip = (updatedGrip) => {
        setSelectedObject(updatedGrip);
        // Update in grips array if needed
        setGrips(grips.map(g => g.id === updatedGrip.id ? updatedGrip : g));
    };

    const handleSave = () => {
        if (grips.length === 0) {
            alert('Please add at least one grip before saving!');
            return;
        }
        setShowContactModal(true);
    };

    const handleSubmitDesign = async (e) => {
        e.preventDefault();

        if (!contactInfo.name || !contactInfo.email) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setSaving(true);

            const sessionId = localStorage.getItem('climbbergs_session');

            const designData = {
                sessionId,
                hangboardBaseId: hangboardBase.id,
                configurationJson: JSON.stringify({ grips }),
                grips: grips.map(g => ({
                    gripTypeId: g.gripTypeId,
                    positionX: g.positionX,
                    positionY: g.positionY,
                    width: g.width,
                    height: g.height,
                    rotation: g.rotation,
                    displayOrder: g.displayOrder,
                    angle: g.angle,
                    depth: g.depth,
                })),
                contactName: contactInfo.name,
                contactEmail: contactInfo.email,
            };

            const savedDesign = await hangboardApi.saveDesign(designData);

            // Show success
            alert(`Design saved! ID: ${savedDesign.id}\n\nWe'll contact you at ${contactInfo.email} within 24 hours with a quote.`);

            setShowContactModal(false);
            setContactInfo({ name: '', email: '' });

            // Optionally: redirect to My Designs
            // navigate('/my-designs');

        } catch (err) {
            console.error('Failed to save design:', err);
            alert('Failed to save design. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading builder...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Design Your Perfect Hangboard
                    </h1>
                    <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
                        Custom training boards built for your climbing goals
                    </p>
                    <div className="flex justify-center gap-8 text-white">
                        <div>
                            <div className="text-3xl font-bold">{gripTypes.length}</div>
                            <div className="text-primary-200">Grip Types</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">100%</div>
                            <div className="text-primary-200">Custom</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{grips.length}</div>
                            <div className="text-primary-200">Grips Added</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Builder Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Grip Palette - Left Column */}
                    <div className="lg:col-span-3">
                        <GripPalette
                            gripTypes={gripTypes}
                            selectedGrip={selectedGrip}
                            onSelectGrip={setSelectedGrip}
                        />
                    </div>

                    {/* Canvas - Middle Column */}
                    <div className="lg:col-span-6">
                        <HangboardCanvas
                            gripTypes={gripTypes}
                            selectedGrip={selectedGrip}
                            onGripsChange={handleGripsChange}
                            onSelectObject={setSelectedObject}
                        />
                    </div>

                    {/* Config Panel - Right Column */}
                    <div className="lg:col-span-3">
                        <ConfigPanel
                            selectedObject={selectedObject}
                            onUpdateGrip={handleUpdateGrip}
                            gripCount={grips.length}
                            basePrice={hangboardBase?.price || 0}
                            onSave={handleSave}
                        />
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h2 className="text-2xl font-bold mb-4">Get Your Custom Quote</h2>
                        <p className="text-gray-600 mb-6">
                            Enter your contact info and we'll send you a detailed quote within 24 hours.
                        </p>

                        <form onSubmit={handleSubmitDesign}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={contactInfo.name}
                                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowContactModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-accent"
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Submit Design'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}