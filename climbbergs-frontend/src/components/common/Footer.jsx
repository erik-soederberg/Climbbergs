export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-32">
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-light tracking-wide mb-4">
                            CLIMBBERGS
                        </h3>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">
                            Custom hangboards designed for climbers who demand precision.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-normal mb-4 tracking-wide">NAVIGATE</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="/" className="hover:text-gray-900 transition-colors">Builder</a></li>
                            <li><a href="/shop" className="hover:text-gray-900 transition-colors">Shop</a></li>
                            <li><a href="/gallery" className="hover:text-gray-900 transition-colors">Gallery</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-normal mb-4 tracking-wide">CONTACT</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li>info@climbbergs.com</li>
                            <li>+46 123 456 789</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-16 pt-8">
                    <p className="text-xs text-gray-400 text-center font-light">
                        © 2026 CLIMBBERGS. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
}