
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Blog1 from './pages/Blog1';
import Blog2 from './pages/Blog2';
import Contacto from './pages/Contacto';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/Blog1" element={<Blog1 />} />
        <Route path="/Blog2" element={<Blog2 />} />
        <Route path="/Contacto" element={<Contacto />} />
      </Routes>
      <Footer/>
    
    </>
  );
}

