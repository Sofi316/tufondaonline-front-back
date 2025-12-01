import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../config/api';

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const response = await api.get('/api/ordenes');
        const lista = response.data.sort((a, b) => b.id - a.id);
        setOrdenes(lista);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando órdenes", error);
        setLoading(false);
      }
    };
    cargarOrdenes();
  }, []);

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container fluid>
      <h2 className="mb-4">Gestión de Pedidos</h2>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="m-0 align-middle">
            <thead className="bg-light">
              <tr>
                <th>N° Orden</th>
                <th>Cliente ID</th>
                <th>Fecha</th>
                <th>Método Pago</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(orden => (
                <tr key={orden.id}>
                  <td className="fw-bold">#{orden.id}</td>
                  <td>{orden.usuarioId}</td>
                  <td>{orden.fecha ? new Date(orden.fecha).toLocaleDateString() : '-'}</td>
                  <td>{orden.metodoPago || 'Webpay'}</td>
                  <td>${orden.total ? orden.total.toLocaleString('es-CL') : 0}</td>
                  <td>
                    {orden.estado === 'Completado' || orden.estado === 'Entregado' ? (
                        <Badge bg="success">{orden.estado}</Badge>
                    ) : (
                        <Badge bg="warning" text="dark">{orden.estado || 'Procesando'}</Badge>
                    )}
                  </td>
                  <td className="text-end">
                    <Button 
                        as={Link} 
                        to={`/admin/ordenes/${orden.id}`} 
                        variant="primary" 
                        size="sm"
                    >
                        Ver Detalle
                    </Button>
                  </td>
                </tr>
              ))}
              {ordenes.length === 0 && (
                <tr><td colSpan="7" className="text-center py-4">No hay órdenes registradas.</td></tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}