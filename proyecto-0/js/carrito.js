document.addEventListener("DOMContentLoaded", () => {
    const productos = document.querySelectorAll(".producto");
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total");
    let carrito = [];

    productos.forEach((producto, index) => {
        const botonAgregar = producto.querySelector(".agregar");
        botonAgregar.addEventListener("click", () => {
            agregarProducto(index);
        });
    });

    function agregarProducto(index) {
        const producto = productos[index];
        const nombre = producto.querySelector("span:first-child").textContent;
        const precio = parseFloat(producto.querySelector("span:nth-child(2)").textContent.replace("Precio: $", ""));
        const productoEnCarrito = carrito.find(item => item.nombre === nombre);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
            productoEnCarrito.subtotal = productoEnCarrito.cantidad * precio;
        } else {
            carrito.push({ nombre, precio, cantidad: 1, subtotal: precio });
        }

        actualizarCarrito();
    }

    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        totalCarrito.textContent = calcularTotal();

        carrito.forEach(item => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${item.nombre} x ${item.cantidad} = $${item.subtotal} <button class="eliminar">Eliminar</button>`;
            listaCarrito.appendChild(listItem);

            const botonesEliminar = listItem.querySelectorAll(".eliminar");
            botonesEliminar.forEach(boton => {
                boton.addEventListener("click", () => {
                    eliminarProducto(item.nombre);
                });
            });
        });
    }

    function eliminarProducto(nombre) {
        carrito = carrito.filter(item => item.nombre !== nombre);
        actualizarCarrito();
    }

    function calcularTotal() {
        return carrito.reduce((total, item) => total + item.subtotal, 0);
    }
});
