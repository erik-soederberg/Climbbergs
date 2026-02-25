import { useState, useEffect } from 'react';
import { hangboardApi } from '../services/api';
import { Link } from 'react-router-dom';

export default function GalleryPage() {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDesigns();
    }, []);

    const loadDesigns = async () => {
        try {
            setLoading(true);
            const data = await hangboardApi.getRecentDesigns(20);
            setDesigns(data);
        } catch (err) {
            console.error('Failed to load gallery:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <h1 className="text-5xl font-bold mb-4">Community Designs</h1>
                    <p className="text-xl text-gray-600">
                        Get inspired by designs from other climbers
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {designs.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg mb-6">
                            No designs yet. Be the first to create one!
                        </p>
                        <Link to="/" className="btn-primary">
                            Create Design
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {designs.map((design) => (
                            <div key={design.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg">Design #{design.id}</h3>
                                            <p className="text-sm text-gray-500">
                                                {new Date(design.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                      {design.grips.length} grips
                    </span>
                                    </div>

                                    {/* Grip type breakdown */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from(new Set(design.grips.map(g => g.gripTypeName))).map(type => (
                                                <span key={type} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {type}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link
                                        to={`/design/${design.id}`}
                                        className="block w-full text-center px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                                    >
                                        View Design
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}