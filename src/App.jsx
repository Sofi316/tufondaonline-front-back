import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1'; // Asumo que esta es la página BlogDetalle1
import Blog2 from './pages/Blog2'; // Asumo que esta es la página BlogDetalle2
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import IniciarSesion from './pages/IniciarSesion';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import Registro from './pages/Registro';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css';


export default function App() {
  return (
    <Routes>
      {/* --- GRUPO 1: RUTAS PÚBLICAS --- */}
      {/* Usamos 'path="/*"' para agrupar todas las rutas públicas */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes> {/* Rutas anidadas para las páginas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog1" element={<Blog1 />} />
              <Route path="/blog2" element={<Blog2 />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/iniciarSesion" element={<IniciarSesion />} />
              <Route path="/registro" element={<Registro />} />
              {/* Esta es la ruta 404 para el sitio público */}
              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
            <Footer />
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