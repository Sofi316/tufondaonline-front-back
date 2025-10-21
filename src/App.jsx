import './App.css';
import { Routes, Route } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css'


export default function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/Blogs" element={<Blogs />} />
          <Route path="/Blog1" element={<Blog1 />} />
          <Route path="/Blog2" element={<Blog2 />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Choripan" element={<ProductoChoripan />} />
          <Route path="/Completo" element={<ProductoCompleto />} />
          <Route path="/Anticucho" element={<ProductoAnticucho />} />
          <Route path="/PastelChoclo" element={<ProductoPastelChoclo />} />
          <Route path="/Empanada" element={<ProductoEmpanada />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          <Route path="/ChoripanVegano" element={<ProductoChoripanVeg />} />
        </Routes>
        <Footer />

      </>
    );
  }