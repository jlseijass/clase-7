let carritoDeCervezas = [];


function Cerveza(tipo, precio, cantidad) {
    this.tipo = tipo;
    this.precio = precio;
    this.cantidad = cantidad;
}


function agregarCerveza() {
    const nuevaCerveza = prompt("Cual se toma hoy?");
    const nuevoPrecio = parseInt(prompt("Cuanto es?"));
    const nuevaCantidad = parseInt(prompt("Cuántas van a ser para empezar?"));

    const cerveza = new Cerveza(nuevaCerveza, nuevoPrecio, nuevaCantidad);
    carritoDeCervezas.push(cerveza);

    sessionStorage.setItem('carrito', JSON.stringify(carritoDeCervezas));
}


function mostrarCarrito() {
    const carritoJSON = sessionStorage.getItem('carrito');
    const carrito = JSON.parse(carritoJSON) || [];
    let mensaje = "Esto es lo que llevas hasta ahora papá:\n";
    let totalCervezas = 0;

    carrito.forEach(cerveza => {
        mensaje += `${cerveza.cantidad} x ${cerveza.tipo} - $${cerveza.precio}\n`;
        totalCervezas += cerveza.cantidad;
    });

    mensaje += `\n Apenas llevamos: ${totalCervezas}`;
    document.getElementById('contenidoModal').textContent = mensaje;
}


function initializeModal() {
    const contenidoModal = document.getElementById('contenidoModal');
    contenidoModal.innerHTML = `
        <p>¿Qué vamos a tomar hoy?</p>
        <button onclick="handleOption(1)">1. Agrega la que quieras</button><br>
        <button onclick="handleOption(2)">2. Ver cómo va la compra para el asado</button><br>
        <button onclick="handleOption(3)">3. Ya vamos a prender el asado</button>
    `;
    document.getElementById('modalCarrito').style.display = 'block';
}


function handleOption(option) {
    switch (option) {
        case 1:
            agregarCerveza();
            break;
        case 2:
            mostrarCarrito();
            break;
        case 3:
            document.getElementById('modalCarrito').style.display = 'none';
            break;
        default:
            alert("Cómo que no vas a poner nada para el asado?");
    }
}


document.getElementsByClassName("close")[0].onclick = function () {
    document.getElementById('modalCarrito').style.display = 'none';
};


window.onload = initializeModal;
