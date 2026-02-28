import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-white border-b border-gray-200">
            <nav className="max-w-6xl mx-auto px-8 py-6">
                <div className="flex justify-between items-center">
                    {/* Minimal Logo */}
                    <Link to="/" className="text-xl font-light tracking-wide text-gray-900">
                        CLIMBBERGS
                    </Link>

                    {/* Minimal Navigation */}
                    <div className="hidden md:flex space-x-12">
                        <Link
                            to="/"
                            className={`text-sm font-light tracking-wide transition-colors ${
                                isActive('/')
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            BUILDER
                        </Link>

                        <Link
                            to="/shop"
                            className={`text-sm font-light tracking-wide transition-colors ${
                                isActive('/shop')
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            SHOP
                        </Link>

                        <Link
                            to="/gallery"
                            className={`text-sm font-light tracking-wide transition-colors ${
                                isActive('/gallery')
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            GALLERY
                        </Link>

                        <Link
                            to="/my-designs"
                            className={`text-sm font-light tracking-wide transition-colors ${
                                isActive('/my-designs')
                                    ? 'text-gray-900'
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            MY DESIGNS
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button className="md:hidden text-gray-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}