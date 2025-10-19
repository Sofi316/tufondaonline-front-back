
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import Registro from './pages/Registro';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer/>
    
    </>
  );
}

