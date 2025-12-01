import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Accordion } from 'react-bootstrap';
import api from '../config/api'; 

function Filtrado({ onFiltrar }) {
  const [listaCategorias, setListaCategorias] = useState([]);
  
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');

  useEffect(() => {
    api.get('/api/categorias')
      .then(res => {
         setListaCategorias(res.data); 
      })
      .catch(err => console.error("Error cargando categorías", err));
  }, []);

  const handleCategoriaChange = (e) => {
    const categoria = e.target.value;
    const isChecked = e.target.checked;
    
    let nuevasCategorias;
    if (isChecked) {
      nuevasCategorias = [...categoriasSeleccionadas, categoria];
    } else {
      nuevasCategorias = categoriasSeleccionadas.filter(c => c !== categoria);
    }
    setCategoriasSeleccionadas(nuevasCategorias);
  };

  const aplicarFiltros = () => {
    onFiltrar({
      categorias: categoriasSeleccionadas,
      precioMin,
      precioMax
    });
  };

  const limpiarFiltros = () => {
    setCategoriasSeleccionadas([]);
    setPrecioMin('');
    setPrecioMax('');
    onFiltrar({ categorias: [], precioMin: '', precioMax: '' });
  };

  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-primary text-white">
        <i className="bi bi-funnel me-2"></i> Filtros
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey="0" flush>
          
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categorías</Accordion.Header>
            <Accordion.Body>
              <Form>
                {listaCategorias.map((cat, index) => (
                  <Form.Check 
                    key={cat.id || index} 
                    type="checkbox"
                    label={cat.nombre || cat} 
                    value={cat.nombre || cat}
                    checked={categoriasSeleccionadas.includes(cat.nombre || cat)}
                    onChange={handleCategoriaChange}
                    className="mb-2"
                  />
                ))}
              </Form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Precio</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-2">
                <Form.Control 
                  type="number" 
                  placeholder="Mínimo" 
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                  size="sm"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control 
                  type="number" 
                  placeholder="Máximo" 
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  size="sm"
                />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="d-grid gap-2 mt-3">
          <Button variant="primary" size="sm" onClick={aplicarFiltros}>
            Aplicar
          </Button>
          <Button variant="outline-secondary" size="sm" onClick={limpiarFiltros}>
            Limpiar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Filtrado;