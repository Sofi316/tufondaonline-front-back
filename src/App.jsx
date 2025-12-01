import './App.css';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './components/CarritoContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Blogs from './pages/Blogs';
import DetalleBlog from './pages/DetalleBlog'; 
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import IniciarSesion from './pages/IniciarSesion';
import Ofertas from './pages/Ofertas.jsx';
import Footer from './components/Footer';
import Categorias from './pages/Categorias';
import Carrito from './pages/Carrito';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminVerOrden from './pages/admin/AdminVerOrden';
import AdminCrearProducto from './pages/admin/AdminCrearProducto';
import AdminVerProducto from './pages/admin/AdminVerProducto';
import AdminEditarProducto from './pages/admin/AdminEditarProducto';
import AdminProductosCriticos from './pages/admin/AdminProductosCriticos';
import AdminReportesProductos from './pages/admin/AdminReportesProductos';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminCrearCategoria from './pages/admin/AdminCrearCategoria';
import AdminPerfil from './pages/admin/AdminPerfil';
import DetalleProducto from './pages/DetalleProducto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css';
import AdminCrearUsuario from './pages/admin/AdminCrearUsuario';
import AdminProductos from './pages/admin/AdminProductos';
import Comprar from './pages/Comprar';
import PagoExitoso from './pages/PagoExitoso';
import PagoFallido from './pages/PagoFallido';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
         
         
        <Route
          path="/*"
          element={
          <>
          <CarritoProvider>
            <ScrollToTop />
            <Navbar />
            <Routes>  
              <Route path="/" element={<Home />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/blogs" element={<Blogs />} /> 
              <Route path="/blog/:id" element={<DetalleBlog />} />
              <Route path="/ofertas" element={<Ofertas />} /> 
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/detalle/:id" element={<DetalleProducto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/iniciarSesion" element={<IniciarSesion />} />
           
              <Route path="/comprar" element={<Comprar />} />
              <Route path="/pago-exitoso" element={<PagoExitoso />} />
              <Route path="/pago-fallido" element={<PagoFallido />} />
             
               
              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
            <Footer />
            </CarritoProvider>
            
          </>
        }
      />

       
       
      
      <Route path="/admin" element={<AdminLayout />}>
         
        <Route index element={<AdminDashboard />} />
        
        
        { <Route path="usuarios" element={<AdminUsuarios />} /> }
        { <Route path="usuarios/crearUser" element={<AdminCrearUsuario />} /> }

        <Route path="ordenes" element={<AdminOrdenes />} />
        <Route path="ordenes/:id" element={<AdminVerOrden />} />  

        <Route path="productos" element={<AdminProductos />} />
        <Route path="productos/crear" element={<AdminCrearProducto />} />
        <Route path="productos/:id" element={<AdminVerProducto />} />
        <Route path="productos/editar/:id" element={<AdminEditarProducto />} />
        <Route path="productos/criticos" element={<AdminProductosCriticos />} />
        <Route path="productos/reportes" element={<AdminReportesProductos />} />

        <Route path="categorias" element={<AdminCategorias />} />
        <Route path="categorias/crear" element={<AdminCrearCategoria />} />

        <Route path="perfil" element={<AdminPerfil />} />
      </Route>

    </Routes>
    </AuthProvider>
  );
}

