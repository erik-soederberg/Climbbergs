import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HangboardBuilder from './pages/HangboardBuilder'; // ← NY IMPORT
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GalleryPage from './pages/GalleryPage';
import MyDesignsPage from './pages/MyDesignsPage';
import DesignDetailPage from './pages/DesignDetailPage';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HangboardBuilder />} /> {/* ← NY ROUTE */}
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/shop/product/:id" element={<ProductDetailPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route path="/my-designs" element={<MyDesignsPage />} />
                    <Route path="/design/:id" element={<DesignDetailPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;