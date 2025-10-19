import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import MiFoto from './components/MiFoto';
import Registro from './pages/Registro';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/stylesheet.css';


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mifoto" element={<MiFoto />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer/>
    
    </>
  );
}
