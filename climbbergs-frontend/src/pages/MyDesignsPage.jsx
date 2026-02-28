import { useState, useEffect } from 'react';
import { hangboardApi } from '../services/api';
import { Link } from 'react-router-dom';

export default function MyDesignsPage() {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDesigns();
    }, []);

    const loadDesigns = async () => {
        try {
            setLoading(true);
            const sessionId = localStorage.getItem('climbbergs_session');

            if (!sessionId) {
                setLoading(false);
                return;
            }

            const data = await hangboardApi.getDesignsBySession(sessionId);
            setDesigns(data);
        } catch (err) {
            console.error('Failed to load designs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this design?')) return;

        try {
            await hangboardApi.deleteDesign(id);
            setDesigns(designs.filter(d => d.id !== id));
        } catch (err) {
            console.error('Failed to delete design:', err);
            alert('Failed to delete design');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your designs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold mb-8">My Designs</h1>

                {designs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg mb-6">
                            You haven't created any designs yet.
                        </p>
                        <Link to="/" className="btn-primary">
                            Create Your First Design
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {designs.map((design) => (
                            <div key={design.id} className="bg-white rounded-lg shadow-md p-6">
                                <div className="mb-4">
                                    <h3 className="font-bold text-lg mb-2">
                                        Design #{design.id}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Created: {new Date(design.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <p className="text-sm">
                                        <span className="font-medium">Board:</span> {design.hangboardBase.name}
                                    </p>
                                    <p className="text-sm">
                                        <span className="font-medium">Grips:</span> {design.grips.length}
                                    </p>
                                    {design.contactName && (
                                        <p className="text-sm">
                                            <span className="font-medium">Contact:</span> {design.contactName}
                                        </p>
                                    )}
                                    {design.isOrderPlaced && (
                                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      Order Placed
                    </span>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/design/${design.id}`}
                                        className="flex-1 text-center px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(design.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}