// src/utils/BotonDescargarBoleta.logic.spec.js

// NOTA: Asegúrate que BotonDescargarBoleta.logic.js se cargue ANTES en karma.conf.js

describe("Pruebas Lógicas de BotonDescargarBoleta", function () {

  // Accedemos a las funciones desde el objeto global window
  var formatPesoChileno = window.BotonDescargarBoletaLogic.formatPesoChileno;
  var generarContenidoBoleta = window.BotonDescargarBoletaLogic.generarContenidoBoleta;

  // --- Pruebas para formatPesoChileno ---
  describe("Función formatPesoChileno", function() {

    // Test 1: Entrada válida - Número entero
    it("debe formatear un entero válido correctamente", function () {
      expect(formatPesoChileno(5000)).toBe("$5.000"); // Asume formato chileno
    });

    // Test 2: Entrada válida - Número con decimales
    it("debe formatear un flotante válido correctamente", function () {
      expect(formatPesoChileno(1234.56)).toBe("$1.235"); // Intl para CLP redondeará
    });

    // Test 3: Entrada inválida - String
    it("debe retornar '$NaN' para una entrada string", function () {
      expect(formatPesoChileno("abc")).toBe("$NaN");
    });

    // Test 4: Entrada nula/incorrecta - null
    it("debe retornar '$NaN' para una entrada null", function () {
      expect(formatPesoChileno(null)).toBe("$NaN");
    });

    // Test 5: Caso borde - Cero
    it("debe formatear cero correctamente", function () {
      expect(formatPesoChileno(0)).toBe("$0");
    });

    // Test 6: Caso borde - Número negativo
    it("debe formatear un número negativo correctamente", function () {
      expect(formatPesoChileno(-1500)).toBe("$-1.500"); // Formato CL
    });

    // Test 7: Entrada inválida - undefined
    it("debe retornar '$NaN' para una entrada undefined", function () {
        expect(formatPesoChileno(undefined)).toBe('$NaN');
    });
  });

  // --- Pruebas para generarContenidoBoleta ---
  describe("Función generarContenidoBoleta", function() {

    // Mock de datos válidos para una orden
    var mockOrderDetailsValidos;

    beforeEach(function() {
        // Reinicia los datos mock antes de cada prueba
        mockOrderDetailsValidos = {
          orderNumber: 12345,
          customerInfo: {
            nombre: 'Juan',
            apellidos: 'Perez',
            correo: 'juan.perez@example.com',
            calle: 'Av. Siempre Viva',
            departamento: '101',
            comuna: 'Springfield',
            region: 'Alguna Region',
            indicaciones: 'Dejar en conserjería'
          },
          items: [
            { nombre: 'Choripan', cantidad: 2, precio: 3000 },
            { nombre: 'Empanada Pino', cantidad: 1, precio: 5000 }
          ],
          total: 11000 // 2*3000 + 1*5000
        };
    });

    // Test 1: Entrada válida - Generación correcta
    it("debe generar el contenido correcto de la boleta para una entrada válida", function () {
      var contenido = generarContenidoBoleta(mockOrderDetailsValidos);
      // Verifica partes clave del contenido
      expect(contenido).toContain("BOLETA FONDAONLINE");
      expect(contenido).toContain("Número de Orden: #12345");
      expect(contenido).toContain("Nombre: Juan Perez");
      expect(contenido).toContain("Dirección: Av. Siempre Viva, Depto 101");
      expect(contenido).toContain("Comuna: Springfield");
      expect(contenido).toContain("Indicaciones: Dejar en conserjería");
      expect(contenido).toContain("- Choripan (x2) - $3.000 c/u = $6.000");
      expect(contenido).toContain("- Empanada Pino (x1) - $5.000 c/u = $5.000");
      expect(contenido).toContain("TOTAL PAGADO: $11.000");
      expect(contenido).toContain("¡Gracias por tu compra!");
    });

    // Test 2: Entrada nula/incorrecta - Objeto orderDetails vacío o nulo
    it("debe retornar un mensaje de error si orderDetails es nulo o vacío", function () {
      var contenidoNull = generarContenidoBoleta(null);
      var contenidoVacio = generarContenidoBoleta({});
      expect(contenidoNull).toContain("Error: No se pudieron generar");
      expect(contenidoVacio).toContain("Error: No se pudieron generar");
    });

    // Test 3: Entrada nula/incorrecta - Faltan campos clave en orderDetails
    it("debe retornar un mensaje de error si faltan campos requeridos", function () {
      var ordenIncompleta = {
        orderNumber: 54321,
        // Falta customerInfo
        items: [{ nombre: 'Agua', cantidad: 1, precio: 1000 }],
        total: 1000
      };
      var contenido = generarContenidoBoleta(ordenIncompleta);
      expect(contenido).toContain("Error: No se pudieron generar");
    });

    // Test 4: Caso borde - Sin items
    it("debe generar contenido correctamente cuando no hay items", function () {
      mockOrderDetailsValidos.items = []; // Vacía los items
      mockOrderDetailsValidos.total = 0; // Ajusta el total
      var contenido = generarContenidoBoleta(mockOrderDetailsValidos);
      expect(contenido).toContain("--- Productos ---");
      // Verifica que no haya líneas de items
      expect(contenido).not.toMatch(/- .* \(x\d+\)/);
      expect(contenido).toContain("TOTAL PAGADO: $0");
    });

    // Test 5: Caso borde - Campos opcionales vacíos
    it("debe generar contenido correctamente cuando faltan campos opcionales", function () {
      delete mockOrderDetailsValidos.customerInfo.departamento; // Elimina departamento
      delete mockOrderDetailsValidos.customerInfo.indicaciones; // Elimina indicaciones
      var contenido = generarContenidoBoleta(mockOrderDetailsValidos);
      expect(contenido).toContain("Dirección: Av. Siempre Viva"); // No debe incluir ", Depto undefined"
      expect(contenido).not.toContain("Indicaciones:"); // No debe incluir la línea
    });

    // Test 6: Entrada inválida - Precio no numérico en item
     it("debe manejar correctamente un precio no numérico en los items", function () {
      mockOrderDetailsValidos.items.push({ nombre: 'Error Item', cantidad: 1, precio: 'abc' });
      mockOrderDetailsValidos.total = 11000; // Mantenemos el total original
      var contenido = generarContenidoBoleta(mockOrderDetailsValidos);
      expect(contenido).toContain("- Error Item (x1) - $NaN c/u = $NaN");
      expect(contenido).toContain("TOTAL PAGADO: $11.000");
    });

  });
});