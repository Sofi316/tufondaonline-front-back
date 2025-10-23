import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Productos from './pages/Productos';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1'; // Asumo que esta es la página BlogDetalle1
import Blog2 from './pages/Blog2'; // Asumo que esta es la página BlogDetalle2
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import IniciarSesion from './pages/IniciarSesion';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
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
import Carrito from './pages/Carrito';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css'

export default function App() {
  return (
    <Routes>
      {/* --- GRUPO 1: RUTAS PÚBLICAS --- */}
      {/* Usamos 'path="/*"' para agrupar todas las rutas públicas */}
      <Route
        path="/*"
        element={
          <>
          <CarritoProvider>
            <Navbar />
            <Routes> {/* Rutas anidadas para las páginas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog1" element={<Blog1 />} />
              <Route path="/blog2" element={<Blog2 />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/Choripan" element={<ProductoChoripan />} />
              <Route path="/Completo" element={<ProductoCompleto />} />
              <Route path="/Anticucho" element={<ProductoAnticucho />} />
              <Route path="/PastelChoclo" element={<ProductoPastelChoclo />} />
              <Route path="/Empanada" element={<ProductoEmpanada />} />
              <Route path="/ChoripanVegano" element={<ProductoChoripanVeg />} />
              <Route path="/CompletoVegano" element={<ProductoCompletoVeg />} />
              <Route path="/EmpanadaVegana" element={<ProductoEmpanadaVeg />} />
              <Route path="/EmpanadaQueso" element={<ProductoEmpanadaQueso />} />
              <Route path="/AnticuchoVerdura" element={<ProductoAnticuchoVeg />} />
              <Route path="/PastelChocloVegano" element={<ProductoPastelChocloVeg />} />
              <Route path="/Terremoto" element={<ProductoTerremoto />} />
              <Route path="/TerremotoNinos" element={<ProductoTerremotoNinos />} />
              <Route path="/CocaCola" element={<ProductoCocaCola />} />
              <Route path="/Agua" element={<ProductoAgua />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/Carrito" element={<Carrito />} />
              <Route path="/iniciarSesion" element={<IniciarSesion />} />
              {/* Esta es la ruta 404 para el sitio público */}
              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
            <Footer />
            </CarritoProvider>
          </>
        }
      />

      {/* --- GRUPO 2: RUTAS DE ADMINISTRADOR --- */}
      {/* Esta ruta carga el layout de admin */}
      
      <Route path="/admin" element={<AdminLayout />}>
        {/* 'index' es la página por defecto que se muestra en /admin */}
        <Route index element={<AdminDashboard />} />
        
        {/* Aquí puedes añadir más rutas de admin en el futuro */}
        {/* <Route path="productos" element={<AdminProductos />} /> */}
        {/* <Route path="usuarios" element={<AdminUsuarios />} /> */}
      </Route>

    </Routes>
  );
}