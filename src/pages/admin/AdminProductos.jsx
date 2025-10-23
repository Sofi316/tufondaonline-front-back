// src/pages/admin/AdminProductos.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// Asegúrate que la ruta a tu archivo de datos sea correcta
import { obtenerProductos, eliminarProducto } from '../../data/productosData.js'; 

export default function AdminProductos() {
  
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); // Hook para navegar programáticamente

  // Carga los productos al montar el componente
  useEffect(() => {
    setProductos(obtenerProductos());
  }, []);

  // Manejador para el botón de eliminar
  const handleEliminar = (id) => {
    // Usamos window.confirm para una confirmación simple
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      eliminarProducto(id); // Llama a la función de tu archivo de datos
      setProductos(obtenerProductos()); // Actualiza la lista que se muestra en la tabla
    }
  };
  
  // Función para formatear el precio como moneda chilena
  const formatPesoChileno = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  // Función para mostrar un Badge coloreado según el stock
  const getStockBadge = (stock) => {
    if (stock <= 10) return <Badge bg="danger">Crítico ({stock})</Badge>;
    if (stock <= 20) return <Badge bg="warning">Bajo ({stock})</Badge>;
    return <Badge bg="success">OK ({stock})</Badge>;
  };

  return (
    <Container fluid> {/* Usa todo el ancho disponible */}
      {/* --- Cabecera con título y botones --- */}
      <Row className="align-items-center mb-3"> {/* mb-3 añade margen inferior */}
        <Col> {/* Columna para el título */}
          <h2>Gestión de Productos</h2>
          <p className="text-muted">Administra el inventario de la tienda.</p>
        </Col>
        <Col xs="auto" className="text-end"> {/* Columna para los botones, alineada a la derecha */}
          {/* Grupo de botones */}
          <ButtonGroup>
            {/* Botón para ir a Crear Nuevo Producto */}
            <Button as={Link} to="/admin/productos/crear" variant="primary">
              <i className="bi bi-plus-lg me-2"></i> Nuevo Producto
            </Button>
            
            {/* ESTE ES EL BOTÓN PARA VER PRODUCTOS CRÍTICOS */}
            <Button as={Link} to="/admin/productos/criticos" variant="warning">
              <i className="bi bi-exclamation-triangle-fill me-2"></i> Productos Críticos
            </Button>
            {/* FIN DEL BOTÓN DE PRODUCTOS CRÍTICOS */}

            {/* Botón para ir a Reportes */}
            <Button as={Link} to="/admin/productos/reportes" variant="secondary">
              <i className="bi bi-file-earmark-bar-graph-fill me-2"></i> Reportes
            </Button>
          </ButtonGroup>
        </Col>
      </Row>

      {/* --- Tabla de Productos --- */}
      <Table striped bordered hover responsive> {/* Estilos de tabla Bootstrap */}
        <thead className="table-dark"> {/* Cabecera oscura */}
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
          {/* Mapea sobre la lista de productos para crear cada fila */}
          {productos.map(prod => (
            <tr key={prod.id}> {/* 'key' es importante para React */}
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>{formatPesoChileno(prod.precio)}</td>
              <td>{getStockBadge(prod.stock)}</td>
              <td>
                {/* Grupo de botones para las acciones de cada fila */}
                <ButtonGroup size="sm"> {/* Botones más pequeños */}
                  {/* Botón Ver ("Mostrar Producto") */}
                  <Button variant="info" as={Link} to={`/admin/productos/${prod.id}`}>
                    <i className="bi bi-eye-fill"></i> {/* Icono Bootstrap */}
                  </Button>
                  {/* Botón Editar */}
                  <Button variant="warning" as={Link} to={`/admin/productos/editar/${prod.id}`}>
                    <i className="bi bi-pencil-fill"></i> {/* Icono Bootstrap */}
                  </Button>
                  {/* Botón Eliminar */}
                  <Button variant="danger" onClick={() => handleEliminar(prod.id)}>
                    <i className="bi bi-trash-fill"></i> {/* Icono Bootstrap */}
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