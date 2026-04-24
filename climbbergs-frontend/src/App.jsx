import { Routes, Route, Navigate } from 'react-router-dom';  // ← INTE BrowserRouter
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HangboardWizard from './pages/HangboardWizard';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GalleryPage from './pages/GalleryPage';
import MyDesignsPage from './pages/MyDesignsPage';
import DesignDetailPage from './pages/DesignDetailPage';

function App() {
  return (
    <div className="min-h-screen flex flex-col">  {/* ← INGEN <Router> här! */}
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Hangboard Wizard (Builder) */}
          <Route path="/" element={<HangboardWizard />} />
          <Route path="/builder" element={<HangboardWizard />} />
          
          {/* Shop */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/product/:id" element={<ProductDetailPage />} />
          
          {/* Gallery */}
          <Route path="/gallery" element={<GalleryPage />} />
          
          {/* My Designs */}
          <Route path="/my-designs" element={<MyDesignsPage />} />
          <Route path="/design/:id" element={<DesignDetailPage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;