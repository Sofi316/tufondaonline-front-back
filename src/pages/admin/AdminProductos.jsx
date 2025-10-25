import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerProductos, eliminarProducto } from '../../data/productosData.js'; 

export default function AdminProductos() {
  
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      eliminarProducto(id); // Llama a la función de tu archivo de datos
      setProductos(obtenerProductos()); // Actualiza la lista que se muestra en la tabla
    }
  };
  
  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  const getStockBadge = (stock) => {
    if (stock <= 10) return <Badge bg="danger">Crítico ({stock})</Badge>;
    if (stock <= 20) return <Badge bg="warning">Bajo ({stock})</Badge>;
    return <Badge bg="success">OK ({stock})</Badge>;
  };

  return (
    <Container fluid> {/* Usa todo el ancho disponible */}
      <Row className="align-items-center mb-3"> {/* mb-3 añade margen inferior */}
        <Col> 
          <h2>Gestión de Productos</h2>
          <p className="text-muted">Administra el inventario de la tienda.</p>
        </Col>
        <Col xs="auto" className="text-end"> 
       
          <ButtonGroup>
      
            <Button as={Link} to="/admin/productos/crear" variant="primary">
              <i className="bi bi-plus-lg me-2"></i> Nuevo Producto
            </Button>
            

            <Button as={Link} to="/admin/productos/criticos" variant="warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i> Productos Críticos
            </Button>
 
            <Button as={Link} to="/admin/productos/reportes" variant="secondary">
              <i className="bi bi-file-earmark-bar-graph-fill me-2"></i> Reportes
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* --- Tabla de Productos --- */}
      <Table striped bordered hover responsive> 
        <thead className="table-dark"> 
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>

          {productos.map(prod => (
            <tr key={prod.id}> 
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>{formatPesoChileno(prod.precio)}</td>
              <td>{getStockBadge(prod.stock)}</td>
              <td>
            
                <ButtonGroup size="sm"> 
            
                  <Button variant="info" as={Link} to={`/admin/productos/${prod.id}`}>
                    <i className="bi bi-eye-fill"></i> 
                  </Button>

                  <Button variant="warning" as={Link} to={`/admin/productos/editar/${prod.id}`}>
                    <i className="bi bi-pencil-fill"></i> 
                  </Button>
                  <Button variant="danger" onClick={() => handleEliminar(prod.id)}>
                    <i className="bi bi-trash-fill"></i> 
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}