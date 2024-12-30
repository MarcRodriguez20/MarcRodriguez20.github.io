// Referencias a elementos
const form = document.getElementById('presupuestoForm');
const producto = document.getElementById('producto');
const plazo = document.getElementById('plazo');
const extras = document.querySelectorAll('.extras input');
const presupuestoFinal = document.getElementById('presupuestoFinal');

// Validaciones de contacto
const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const telefono = document.getElementById('telefono');
const email = document.getElementById('email');

// Expresiones regulares para validación
const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
const regexTelefono = /^[0-9]{9}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cálculo de presupuesto dinámico
function calcularPresupuesto() {
    let total = parseFloat(producto.value);
    extras.forEach(extra => {
        if (extra.checked) total += parseFloat(extra.value);
    });

    const descuento = plazo.value > 6 ? 0.9 : 1;  // 10% descuento si plazo > 6 meses
    total *= descuento;

    presupuestoFinal.textContent = `${total.toFixed(2)}€`;
}

// Validar campos de contacto
function validarFormulario(e) {
    e.preventDefault();
    let valido = true;

    if (!regexNombre.test(nombre.value)) {
        valido = false;
        document.getElementById('errorNombre').textContent = 'Nombre inválido.';
    } else {
        document.getElementById('errorNombre').textContent = '';
    }

    if (!regexNombre.test(apellidos.value)) {
        valido = false;
        document.getElementById('errorApellidos').textContent = 'Apellidos inválidos.';
    }

    if (!regexTelefono.test(telefono.value)) {
        valido = false;
        document.getElementById('errorTelefono').textContent = 'Teléfono inválido.';
    }

    if (!regexEmail.test(email.value)) {
        valido = false;
        document.getElementById('errorEmail').textContent = 'Correo inválido.';
    }

    if (!document.getElementById('condiciones').checked) {
        alert('Debes aceptar las condiciones de privacidad.');
        valido = false;
    }

    if (valido) {
        alert('Formulario enviado con éxito.');
        form.reset();
        calcularPresupuesto();
    }
}

// Eventos
form.addEventListener('input', calcularPresupuesto);
form.addEventListener('submit', validarFormulario);