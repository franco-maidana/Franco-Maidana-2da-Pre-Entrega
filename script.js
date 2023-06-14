let nombreUsuario = prompt('Bienvenido, ingrese su nombre');

while (nombreUsuario.trim() === '') {
  alert('Nombre inválido, por favor ingrese el nombre nuevamente');
  nombreUsuario = prompt('Por favor ingrese nuevamente su nombre');
}

let dineroDelUsuario = prompt('ingrese el dinero que piensa gastar');
alert(`Bienvenido ${nombreUsuario}, comencemos a comprar`);


const SeccionCategoria = Supermercado.map((producto) => {
  return {
    name: producto.categoria
  };
});

const arregloPalabras = SeccionCategoria.map((categoria) => categoria.name);
const palabrasFiltradas = [];

let resultados = [];
let productoAmostrar = [];
let carritoDeCompras = [];

// Obtenga las categorías únicas de la matriz Supermercado
const categorias = [...new Set(Supermercado.map((producto) => producto.categoria))];

let categoriaSeleccionada;
if (categorias.length === 1) {
  // Si solo hay una categoría, asígnala directamente a categoriaSeleccionada
  categoriaSeleccionada = categorias[0];
} else {
  //   solicita al usuario que seleccione una categoria
  categoriaSeleccionada = prompt(`Categorías disponibles:\n${categorias.join("\n")}\n\nIngrese la categoría a filtrar (o escriba 'finalizar' para terminar la compra):`);
}

while (categoriaSeleccionada.toLowerCase() !== "finalizar") {
  const productosCategoria = Supermercado.filter(
    (producto) => producto.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
  );

  if (productosCategoria.length === 0) {
    alert("No hay productos disponibles en la categoría seleccionada.");
  } else {
    productoAmostrar = []; // Restablecer la matriz para cada selección de categoría

    productosCategoria.forEach((producto, index) => {
      const nombre = producto.nombre;
      const marca = producto.marca;
      const precio = parseFloat(producto.precio.slice(1)); // Convierta el precio en un número sin el símbolo "$"
      productoAmostrar.push(`${index + 1}. ${nombre} ${marca} $${precio}\n`);
    });

    let productosFinales = productoAmostrar.join('');
    console.log(productosFinales);
    let productoElegido = parseInt(prompt(`Productos disponibles:\n${productosFinales}\nIngrese el número del producto que desea agregar al carrito:`));

    if (isNaN(productoElegido) || productoElegido < 1 || productoElegido > productosCategoria.length) {
      alert("Por favor, ingrese un número válido correspondiente al producto.");
    } else {
      //Agregar el producto seleccionado al carrito de compras
      carritoDeCompras.push(productosCategoria[productoElegido - 1]);
      alert("Producto agregado al carrito de compras.");
    }
  }

  categoriaSeleccionada = prompt(`Categorías disponibles:\n${categorias.join("\n")}\n\nIngrese la categoría a filtrar (o escriba 'finalizar' para terminar la compra):`);
}

let montoTotal = 0;
let carritoFinal = [];

// Calcule el monto total de la compra y crea una lista de productos en el carrito de compras.
carritoDeCompras.forEach((producto) => {
  const nombre = producto.nombre;
  const marca = producto.marca;
  const precio = parseFloat(producto.precio.slice(1)); //Convierta el precio en un número sin el símbolo "$"
  montoTotal += precio;
  carritoFinal.push(`${nombre} ${marca} $${precio}`);
});

console.log('dinero del cliente ingresado para poder realizar la compra' + dineroDelUsuario);
console.log("Carrito de Compras:");
console.table(carritoFinal);
console.log(`Tu compra ha finalizado. El precio a pagar es: $ ${montoTotal} `);


// Verificar si el dinero total es mayor que el monto de la compra si la compra supera el monto que ingreso no va a poder realizar la operacion.
if (dineroDelUsuario >= montoTotal) {
  alert("Puedes realizar la compra");
  let vuelto = dineroDelUsuario - montoTotal;
  alert(`Vuelto: $${vuelto}`);
  console.table(`Vuelto: $${vuelto}`);
} else {
  alert("No tienes suficiente dinero para realizar la compra");
  let debe = montoTotal - dineroDelUsuario;
  alert(`Debe: $${debe}`);
  console.table(`Debe: $${debe}`);
}
