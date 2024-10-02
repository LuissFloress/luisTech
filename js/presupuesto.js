// Agregar listeners a los elementos
document.getElementById('producto').addEventListener('change', actualizarPresupuesto);
document.getElementById('plazoPago').addEventListener('input', actualizarPresupuesto);
document.getElementById('extras').addEventListener('input', actualizarPresupuesto);
document.getElementById('formularioPresupuesto').addEventListener('submit', mostrarAgradecimiento);


function actualizarPresupuesto() {
    const preciosProductos = {
        IA_01: 100,
        IA_02: 150,
        IA_03: 200,
        CC_01: 250,
        CC_02: 300,
        CC_03: 350,
        ER_01: 400,
        ER_02: 450,
        ER_03: 500,
        IP_01: 550,
        IP_02: 600,
        IP_03: 650
    };

    const productoSeleccionado = document.getElementById('producto').value;
    const plazoPago = parseInt(document.getElementById('plazoPago').value, 10);
    const extras = document.getElementById('extras').value;

    if (!preciosProductos.hasOwnProperty(productoSeleccionado)) {
        console.error('Producto no encontrado');
        return;
    }

    const precioBase = preciosProductos[productoSeleccionado];
    const precioExtras = extras ? extras.split(',').length * 20 : 0;
    const precioPlazo = plazoPago > 1 ? (plazoPago - 1) * 10 : 0;
    const precioTotal = precioBase + precioExtras + precioPlazo;

    document.getElementById('presupuesto').innerText = `Presupuesto Total: ${precioTotal}€`;
    document.getElementById('imagenProducto').src = `../assets/img/productos/${productoSeleccionado}.jpg`;
}


function mostrarAgradecimiento(event) {
    // Evita que el formulario se envíe de la manera tradicional
    event.preventDefault();
    
    // Obtiene los valores de los campos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido1 = document.getElementById('apellido1').value;
    const apellido2 = document.getElementById('apellido2').value;
    const empresa = document.getElementById('empresa').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const productoSelect = document.getElementById('producto');
    const producto = productoSelect.value;
    const productoNombre = productoSelect.options[productoSelect.selectedIndex].text;
    const presupuesto = document.getElementById('presupuesto').innerText;

    // Actualiza el contenido de los elementos en la página con los valores obtenidos
    document.getElementById('nombreCliente').innerText = nombre;
    document.getElementById('apellido1Cliente').innerText = apellido1;
    document.getElementById('apellido2Cliente').innerText = apellido2;
    document.getElementById('empresaCliente').innerText = empresa;
    document.getElementById('emailCliente').innerText = email;
    document.getElementById('telefonoCliente').innerText = telefono;
    document.getElementById('productoSeleccionado').innerText = productoNombre;
    document.getElementById('imagenProductoSeleccionado').src = `../assets/img/productos/${producto}.jpg`;
    document.getElementById('presupuestoTotal').innerText = presupuesto;
    
    // Oculta el formulario de presupuesto y muestra el mensaje de agradecimiento
    document.getElementById('formularioPresupuesto').style.display = 'none';
    document.getElementById('mensajeAgradecimiento').style.display = 'block';

    // Desplaza la ventana al inicio de la página
    window.scrollTo(0, 0);
}


// Restricciones de longitud
    document.getElementById('nombre').setAttribute('maxlength', '15');
    document.getElementById('apellido1').setAttribute('maxlength', '40');
    document.getElementById('apellido2').setAttribute('maxlength', '40');
    document.getElementById('empresa').setAttribute('maxlength', '40');
    document.getElementById('telefono').setAttribute('pattern', '[0-9]{9}');
    document.getElementById('email').setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');

// Restricciones de contenido
    document.getElementById('nombre').addEventListener('input', function (e) {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    document.getElementById('apellido1').addEventListener('input', function (e) {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    document.getElementById('apellido2').addEventListener('input', function (e) {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    document.getElementById('empresa').addEventListener('input', function (e) {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    document.getElementById('telefono').addEventListener('input', function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    document.getElementById('email').addEventListener('input', function (e) {
        this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, '');
    });