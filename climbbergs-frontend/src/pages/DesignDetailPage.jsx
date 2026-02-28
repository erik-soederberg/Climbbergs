import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hangboardApi } from '../services/api';

export default function DesignDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [design, setDesign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDesign();
    }, [id]);

    const loadDesign = async () => {
        try {
            setLoading(true);
            const data = await hangboardApi.getDesignById(id);
            setDesign(data);
        } catch (err) {
            console.error('Failed to load design:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading design...</p>
                </div>
            </div>
        );
    }

    if (!design) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Design not found</p>
                    <button onClick={() => navigate('/my-designs')} className="btn-primary">
                        Back to My Designs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-3xl font-bold mb-6">Design #{design.id}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Design Info */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Details</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="font-medium">Board:</span> {design.hangboardBase.name}
                                </div>
                                <div>
                                    <span className="font-medium">Size:</span> {design.hangboardBase.width} x {design.hangboardBase.height} cm
                                </div>
                                <div>
                                    <span className="font-medium">Material:</span> {design.hangboardBase.material}
                                </div>
                                <div>
                                    <span className="font-medium">Total Grips:</span> {design.grips.length}
                                </div>
                                <div>
                                    <span className="font-medium">Created:</span> {new Date(design.createdAt).toLocaleString()}
                                </div>
                                {design.contactName && (
                                    <div>
                                        <span className="font-medium">Contact:</span> {design.contactName}
                                    </div>
                                )}
                                {design.contactEmail && (
                                    <div>
                                        <span className="font-medium">Email:</span> {design.contactEmail}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Grips Breakdown */}
                        <div>
                            <h2 className="text-xl font-bold mb-4">Grips Used</h2>
                            <div className="space-y-2">
                                {design.grips.map((grip, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                        <div
                                            className="w-6 h-6 rounded-full"
                                            style={{ backgroundColor: grip.color }}
                                        ></div>
                                        <div className="flex-1">
                                            <div className="font-medium">{grip.gripTypeName}</div>
                                            {grip.depth && (
                                                <div className="text-xs text-gray-600">Depth: {grip.depth}mm</div>
                                            )}
                                            {grip.angle !== null && grip.angle !== undefined && (
                                                <div className="text-xs text-gray-600">Angle: {grip.angle}°</div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 pt-6 border-t">
                        <div className="flex gap-4">
                            <button className="btn-primary flex-1">
                                Request Changes
                            </button>
                            <button className="btn-accent flex-1">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}