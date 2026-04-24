export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-light mb-4">CLIMBBERGS</h3>
            <p className="text-sm text-gray-400">
              Skräddarsydda träningsbräden för klättrare
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">PRODUKTER</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/builder" className="hover:text-white transition-colors">Bygg Hangboard</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Färdiga Modeller</a></li>
              <li><a href="/gallery" className="hover:text-white transition-colors">Galleri</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Monteringsguide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Träningsguide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontakta oss</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">KONTAKT</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@climbbergs.se</li>
              <li>+46 70 123 45 67</li>
              <li>Malmö, Sverige</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 Climbbergs. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
}