// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Obtiene información sobre la ruta actual
  const { pathname } = useLocation();

  // Este 'efecto' se ejecuta CADA VEZ que cambia el 'pathname'
  useEffect(() => {
    // Hace scroll hasta la parte superior de la ventana
    window.scrollTo(0, 0);
  }, [pathname]); // El array [pathname] asegura que solo se ejecute al cambiar la ruta

  // Este componente no dibuja nada en la pantalla
  return null;
}

export default ScrollToTop;