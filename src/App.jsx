import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './components/CarritoContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Registro from './pages/Registro';
import Productos from './pages/Productos';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1';
import Blog2 from './pages/Blog2';
import Contacto from './pages/Contacto';
import ProductoChoripan from './pages/ProductoChoripan';
import ProductoCompleto from './pages/ProductoCompleto';
import ProductoAnticucho from './pages/ProductoAnticucho';
import ProductoPastelChoclo from './pages/ProductoPastelChoclo';
import ProductoEmpanada from './pages/ProductoEmpanada';
import ProductoChoripanVeg from './pages/ProductoChoripanVeg';
import ProductoCompletoVeg from './pages/ProductoCompletoVeg';
import ProductoEmpanadaVeg from './pages/ProductoEmpanadaVeg';
import ProductoEmpanadaQueso from './pages/ProductoEmpanadaQueso';
import ProductoAnticuchoVeg from './pages/ProductoAnticuchoVer';
import ProductoPastelChocloVeg from './pages/ProductoPastelChocloVeg';
import ProductoTerremoto from './pages/ProductoTerremoto';
import ProductoTerremotoNinos from './pages/ProductoTerremotoNinos';
import ProductoCocaCola from './pages/ProductoCoca';
import ProductoAgua from './pages/ProductoAgua';
import Nosotros from './pages/Nosotros';
import Carrito from './pages/Carrito';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css'

export default function App() {
    return (
      <CarritoProvider> {/* Envuelve toda tu aplicación con el Provider */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog1" element={<Blog1 />} />
          <Route path="/blog2" element={<Blog2 />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/choripan" element={<ProductoChoripan />} />
          <Route path="/completo" element={<ProductoCompleto />} />
          <Route path="/anticucho" element={<ProductoAnticucho />} />
          <Route path="/pastelchoclo" element={<ProductoPastelChoclo />} />
          <Route path="/empanada" element={<ProductoEmpanada />} />
          <Route path="/choripanvegano" element={<ProductoChoripanVeg />} />
          <Route path="/completovegano" element={<ProductoCompletoVeg />} />
          <Route path="/empanadavegana" element={<ProductoEmpanadaVeg />} />
          <Route path="/empanadaqueso" element={<ProductoEmpanadaQueso />} />
          <Route path="/anticuchoverdura" element={<ProductoAnticuchoVeg />} />
          <Route path="/pastelchoclovegano" element={<ProductoPastelChocloVeg />} />
          <Route path="/terremoto" element={<ProductoTerremoto />} />
          <Route path="/terremotoninos" element={<ProductoTerremotoNinos />} />
          <Route path="/cocacola" element={<ProductoCocaCola />} />
          <Route path="/agua" element={<ProductoAgua />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
        <Footer />
      </CarritoProvider>
    );
  }