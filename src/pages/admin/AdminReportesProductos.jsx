import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../../config/api';

export default function AdminReportesProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/productos')
      .then(res => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalStock = productos.reduce((acc, p) => acc + p.stock, 0);

  const valorTotalInventario = productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);


  const dataPorCategoria = productos.reduce((acc, curr) => {
    const catNombre = typeof curr.categoria === 'object' ? curr.categoria.nombre : curr.categoria;
    const existente = acc.find(item => item.name === catNombre);
    if (existente) {
      existente.cantidad += 1;
      existente.stock += curr.stock;
    } else {
      acc.push({ name: catNombre || 'Sin Cat', cantidad: 1, stock: curr.stock });
    }
    return acc;
  }, []);

  const topCaros = [...productos].sort((a, b) => b.precio - a.precio).slice(0, 5);

  const COLORES = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border"/></Container>;

  return (
    <Container fluid>
      <h2 className="mb-4">Dashboard de Inventario</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-white bg-primary shadow-sm h-100">
            <Card.Body>
              <Card.Title>Total Productos</Card.Title>
              <h2 className="display-4">{productos.length}</h2>
              <Card.Text>SKUs únicos en sistema</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-success shadow-sm h-100">
            <Card.Body>
              <Card.Title>Unidades en Stock</Card.Title>
              <h2 className="display-4">{totalStock}</h2>
              <Card.Text>Suma total de stock</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-warning shadow-sm h-100">
            <Card.Body>
              <Card.Title>Valorización</Card.Title>
              <h2 className="display-4">${valorTotalInventario.toLocaleString('es-CL')}</h2>
              <Card.Text>Costo total venta estimado</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header>Distribución por Categoría</Card.Header>
            <Card.Body style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataPorCategoria}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cantidad"
                  >
                    {dataPorCategoria.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORES[index % COLORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header>Top 5 Productos Mayor Valor</Card.Header>
            <Card.Body style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCaros} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nombre" type="category" width={100} style={{fontSize: '12px'}} />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Legend />
                  <Bar dataKey="precio" fill="#82ca9d" name="Precio" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}