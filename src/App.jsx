import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './components/CarritoContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Productos from './pages/Productos';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1'; 
import Blog2 from './pages/Blog2'; 
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import IniciarSesion from './pages/IniciarSesion';
import Ofertas from './pages/Ofertas.jsx';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminVerOrden from './pages/admin/AdminVerOrden';
import AdminCrearUsuario from './pages/admin/AdminCrearUsuario';

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
              <Route path="/ofertas" element={<Ofertas />} /> 
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/choripan" element={<ProductoChoripan />} />
              <Route path="/completo" element={<ProductoCompleto />} />
              <Route path="/anticucho" element={<ProductoAnticucho />} />
              <Route path="/pastelChoclo" element={<ProductoPastelChoclo />} />
              <Route path="/empanada" element={<ProductoEmpanada />} />
              <Route path="/choripanVegano" element={<ProductoChoripanVeg />} />
              <Route path="/completoVegano" element={<ProductoCompletoVeg />} />
              <Route path="/empanadaVegana" element={<ProductoEmpanadaVeg />} />
              <Route path="/empanadaQueso" element={<ProductoEmpanadaQueso />} />
              <Route path="/anticuchoVerdura" element={<ProductoAnticuchoVeg />} />
              <Route path="/pastelChocloVegano" element={<ProductoPastelChocloVeg />} />
              <Route path="/terremoto" element={<ProductoTerremoto />} />
              <Route path="/terremotoNinos" element={<ProductoTerremotoNinos />} />
              <Route path="/aocaCola" element={<ProductoCocaCola />} />
              <Route path="/agua" element={<ProductoAgua />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/iniciarSesion" element={<IniciarSesion />} />
              <Route path="/registro" element={<Registro />} />
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
        { <Route path="usuarios" element={<AdminUsuarios />} /> }
        { <Route path="usuarios/crearUser" element={<AdminCrearUsuario />} /> }

        <Route path="ordenes" element={<AdminOrdenes />} />
        <Route path="ordenes/:id" element={<AdminVerOrden />} /> {/* Ruta de detalle */}
      </Route>

    </Routes>
  );
}
