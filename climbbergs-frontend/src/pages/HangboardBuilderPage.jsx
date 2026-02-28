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
        <div className="min-h-screen bg-white">
            {/* Minimal Hero */}
            <div className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-8 py-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
                        Design Your Hangboard
                    </h1>
                    <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
                        Precision-crafted training boards built to your specifications
                    </p>
                </div>
            </div>

            {/* Builder Section - More Spacing */}
            <div className="max-w-6xl mx-auto px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Grip Palette */}
                    <div className="lg:col-span-3">
                        <GripPalette
                            gripTypes={gripTypes}
                            selectedGrip={selectedGrip}
                            onSelectGrip={setSelectedGrip}
                        />
                    </div>

                    {/* Canvas */}
                    <div className="lg:col-span-6">
                        <HangboardCanvas
                            gripTypes={gripTypes}
                            selectedGrip={selectedGrip}
                            onGripsChange={handleGripsChange}
                            onSelectObject={setSelectedObject}
                        />
                    </div>

                    {/* Config Panel */}
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

            {/* Contact Modal - Minimal */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white max-w-md w-full p-12 border border-gray-200">
                        <h2 className="text-2xl font-light mb-2">Request Quote</h2>
                        <p className="text-sm text-gray-500 mb-8 font-light">
                            We'll send you a detailed quote within 24 hours.
                        </p>

                        <form onSubmit={handleSubmitDesign} className="space-y-6">
                            <div>
                                <label className="block text-xs font-normal mb-2 tracking-wide text-gray-700">NAME</label>
                                <input
                                    type="text"
                                    value={contactInfo.name}
                                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-normal mb-2 tracking-wide text-gray-700">EMAIL</label>
                                <input
                                    type="email"
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors"
                                    required
                                />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowContactModal(false)}
                                    className="flex-1 btn-secondary"
                                    disabled={saving}
                                >
                                    CANCEL
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? 'SUBMITTING...' : 'SUBMIT'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );}