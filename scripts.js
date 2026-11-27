// ============================================================
// DATOS DE PARTIDA
// No los modifiques: son los datos de partida.
// ============================================================
const productos = [
  {
    id: 1,
    nombre: "auriculares inalámbricos pro",
    precio: 79.99,
    descuento: 15, // porcentaje
    fechaFinOferta: "2026-08-25",
    descripcion: "Auriculares con cancelación de ruido activa, autonomía de 30 horas y estuche de carga rápida compatible con USB-C."
  },
  {
    id: 2,
    nombre: "teclado mecánico compacto",
    precio: 54.50,
    descuento: 0,
    fechaFinOferta: null,
    descripcion: "Teclado mecánico de formato 75%, switches intercambiables en caliente y retroiluminación RGB personalizable."
  },
  {
    id: 3,
    nombre: "monitor 27 pulgadas 4K",
    precio: 329.00,
    descuento: 10,
    fechaFinOferta: "2026-08-18",
    descripcion: "Monitor 4K de 27 pulgadas con panel IPS, 99% sRGB y soporte ajustable en altura e inclinación."
  },
  {
    id: 4,
    nombre: "cargador rápido 65w",
    precio: 24.99,
    descuento: 0,
    fechaFinOferta: null,
    descripcion: "Cargador USB-C de 65W con GaN, compatible con portátiles, tablets y móviles."
  },
  {
    id: 5,
    nombre: "webcam full hd",
    precio: 39.95,
    descuento: 20,
    fechaFinOferta: "2026-08-30",
    descripcion: "Webcam 1080p con enfoque automático, micrófono integrado con reducción de ruido y clip universal."
  }
];

// A continuación se detallan los ejercicios a impleentar
// Recuerda que la documentación es un punto importante

// ============================================================
// EJERCICIO 1 — Catálogo (Math, String + DOM)
// Pinta en #contenedorProductos una tarjeta por producto.
// Requisitos:
//   - Nombre con la primera letra en mayúscula (el resto tal cual).
//   - Precio final redondeado a 2 decimales si el producto tiene
//     descuento (precio - precio*descuento/100), si no, precio normal.
//   - Descripción truncada a 60 caracteres + "..." si la supera.
//   - Si tiene descuento, mostrar una etiqueta "-X% dto".
// (El estado de la oferta, caducada o vigente, se añade en el
// ejercicio 5 sobre esta misma función.)
// ============================================================
/**
 * Pinta en #contenedorProductos una tarjeta por cada producto.
 * @param {Array} listaProductos productos que se van a mostrar
 */
function pintarCatalogo(listaProductos) {
  let html = "";

  for (const p of listaProductos) {
    // Nombre: primera letra en mayúscula y el resto en minúscula
    let nombre = p.nombre[0].toUpperCase() + p.nombre.slice(1).toLowerCase();

    // Descripción: máximo 60 caracteres
    let descripcion = p.descripcion;
    if (descripcion.length > 60) {
      descripcion = descripcion.slice(0, 60) + "...";
    }

    // Precio con el descuento aplicado
    let precio = p.precio - (p.precio * p.descuento) / 100;

    // Etiqueta de descuento (solo si tiene)
    let descuento = "";
    if (p.descuento > 0) {
      descuento = `<span class="descuento">-${p.descuento}% dto</span>`;
    }

    html += `<div class="tarjeta-producto">
      <h3>${nombre}</h3>
      <p>${descripcion}</p>
      <p class="precio">${precio.toFixed(2)} €</p>
      ${descuento}
      <button onclick="anadirAlCarrito(${p.id})">Añadir al carrito</button>
    </div>`;
  }

  document.getElementById("contenedorProductos").innerHTML = html;
}

function mostrarTodosLosProductos() {
  pintarCatalogo(productos);
}

// ============================================================
// EJERCICIO 2 — Buscador y código promocional (RegExp)
// ============================================================

// Filtra "productos" por el texto de #inputBusqueda usando una
// expresión regular insensible a mayúsculas/minúsculas, y vuelve
// a pintar el catálogo solo con los resultados.
// Debe guardar también la búsqueda válida (ver ejercicio 4).
function buscarProductos() {
  // Texto introducido por el usuario, sin espacios al principio ni al final
  const textoBuscado = document.getElementById("inputBusqueda").value.trim();

  // Búsqueda vacía: se muestra el catálogo completo
  if (textoBuscado === "") {
    mostrarTodosLosProductos();
    return;
  }

  // Se escapan los caracteres especiales de RegExp (. * + ? ( ) etc.)
  // para que se busquen como texto normal y no den error.
  const textoEscapado = textoBuscado.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Expresión regular insensible a mayúsculas/minúsculas (flag "i")
  const patron = new RegExp(textoEscapado, "i");

  // Productos cuyo nombre contiene el texto buscado
  const resultados = productos.filter(function (p) {
    return patron.test(p.nombre);
  });

  pintarCatalogo(resultados);

  // Se guarda la búsqueda en el historial (ejercicio 4)
  guardarBusquedaEnHistorial(textoBuscado);
}

// Valida el contenido de #inputPromo contra el patrón:
// 3 letras mayúsculas seguidas de 4 dígitos (ej. ABC1234).
// Muestra el resultado en #mensajePromo.
function validarCodigoPromocional() {
    
  // Código introducido, sin espacios al principio ni al final
  const codigo = document.getElementById("inputPromo").value.trim();
  const mensaje = document.getElementById("mensajePromo");

  // ^ y $ obligan a que el código sea EXACTAMENTE ese formato
  const patronCodigo = /^[A-Z]{3}[0-9]{4}$/;

  if (patronCodigo.test(codigo)) {
    mensaje.textContent = "Código válido. Descuento aplicado en el siguiente paso de compra.";
    mensaje.style.color = "green";
  } else {
    mensaje.textContent = "Código no válido. Formato esperado: 3 letras mayúsculas + 4 dígitos (ej. ABC1234).";
    mensaje.style.color = "red";
  }
}



// ============================================================
// EJERCICIO 3 — Carrito de compra (localStorage)
// El carrito es un array de objetos { id, nombre, precio, cantidad }
// guardado bajo la clave "carritoTienda".
// ============================================================

function anadirAlCarrito(idProducto) {
  // TODO: leer carrito de localStorage (o [] si no existe),
  // añadir el producto o incrementar cantidad si ya estaba,
  // guardar de nuevo y repintar la tabla del carrito.
}

function eliminarDelCarrito(idProducto) {
  // TODO
}

function vaciarCarrito() {
  // TODO
}

function pintarCarrito() {
  // TODO: leer el carrito de localStorage y generar las filas
  // de #cuerpoCarrito, calculando el total con Math y mostrándolo
  // en #totalCarrito.
}

// ============================================================
// EJERCICIO 4 — Historial de búsquedas (sessionStorage)
// El historial es un array de strings guardado bajo la clave
// "historialBusquedas", máximo 5 elementos, el más reciente primero.
// ============================================================

function guardarBusquedaEnHistorial(textoBuscado) {
  // TODO
}

function pintarHistorial() {
  // TODO: leer sessionStorage y rellenar #listaHistorial.
}

// ============================================================
// EJERCICIO 5 — Fechas de oferta (Date)
// Para cada producto con descuento y fechaFinOferta:
//   - Si la fecha ya ha pasado respecto a hoy: mostrar en su
//     tarjeta "Oferta finalizada" y NO aplicar el descuento al
//     precio mostrado (usar el precio normal).
//   - Si no ha pasado: mostrar "Quedan X días de oferta"
//     (diferencia en milisegundos entre fechaFinOferta y hoy,
//     convertida a días con Math.ceil).
// Esta lógica se integra dentro de pintarCatalogo() del ejercicio 1,
// no es una función aparte.
// ============================================================

// ============================================================
// Carga inicial de la página
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  mostrarTodosLosProductos();
  pintarCarrito();
  pintarHistorial();
});
