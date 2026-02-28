import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
              Climb<span className="text-primary-500">bergs</span>
            </span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <Link
                            to="/"
                            className={`font-medium transition-colors ${
                                isActive('/')
                                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                                    : 'text-gray-700 hover:text-primary-500'
                            }`}
                        >
                            🎨 Build Hangboard
                        </Link>

                        <Link
                            to="/shop"
                            className={`font-medium transition-colors ${
                                isActive('/shop')
                                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                                    : 'text-gray-700 hover:text-primary-500'
                            }`}
                        >
                            🛍️ Shop
                        </Link>

                        <Link
                            to="/gallery"
                            className={`font-medium transition-colors ${
                                isActive('/gallery')
                                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                                    : 'text-gray-700 hover:text-primary-500'
                            }`}
                        >
                            🖼️ Gallery
                        </Link>

                        <Link
                            to="/my-designs"
                            className={`font-medium transition-colors ${
                                isActive('/my-designs')
                                    ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                                    : 'text-gray-700 hover:text-primary-500'
                            }`}
                        >
                            📋 My Designs
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}