
function showMessage() {
    var message = document.getElementById("messageInput").value;
    var customMessage = "Tu pin es: " + message + " " + "Bienvenido viajero pokemon";
    alert(customMessage);
}
function mostrarOpcion(opcion) {
    document.querySelectorAll('main > div').forEach(div => div.classList.add('oculto'));
    document.getElementById(opcion).classList.remove('oculto');
}

function realizarRetiro() {
    const monto = document.getElementById('retiroMonto').value;

    if (!validate.isDefined(monto) || monto.trim() === "") {
        mostrarErrorRetiro("Por favor, ingresa un monto.");
        return;
    }

    const montoNumerico = parseFloat(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
        mostrarErrorRetiro("El monto ingresado no es válido. Debe ser un número mayor a 0.");
        return;
    }

    mostrarExitoRetiro();
}

function mostrarExitoRetiro() {
    Swal.fire("Retiro Exitoso!", "Gracias por utilizar Pokemon Bank", "success");
}

function mostrarErrorRetiro(mensaje) {
    Swal.fire("Error", mensaje, "error");
}

function realizarDeposito() {
    const monto = document.getElementById('depositoMonto').value;

    if (!validate.isDefined(monto) || monto.trim() === "") {
        mostrarErrorDeposito("Por favor, ingresa un monto a depositar.");
        return;
    }

    const montoNumerico = parseFloat(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
        mostrarErrorDeposito("El monto ingresado no es válido. Debe ser un número mayor a 0.");
        return;
    }

    mostrarExitoDeposito();
}

function mostrarExitoDeposito() {
    Swal.fire("Depósito Exitoso!", "Gracias por utilizar Pokemon Bank", "success");
}

function mostrarErrorDeposito(mensaje) {
    Swal.fire("Error", mensaje, "error");
}

function realizarPago() {
    const servicio = document.getElementById('servicio').value;
    const monto = document.getElementById('pagoMonto').value;

    const constraints = {
        servicio: {
            presence: { message: 'es requerido' },
            length: {
                minimum: 1,
                message: 'debe contener al menos un carácter'
            }
        },
        monto: {
            presence: { message: 'es requerido' },
            numericality: {
                greaterThan: 0,
                message: 'debe ser un número mayor que 0'
            }
        }
    };

    const validationResult = validate({ servicio, monto }, constraints);

    if (validationResult) {
        mostrarErrorPago(validationResult);
    } else {
        const montoNumerico = parseFloat(monto);
        mostrarExitoPago(montoNumerico, servicio);
    }
}

function mostrarExitoPago(monto, servicio) {
    Swal.fire({
        title: 'Pago Exitoso!',
        text: `Has pagado $${monto} por ${servicio}. Gracias por utilizar el servicio.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

function mostrarErrorPago(validationResult) {
    let errorMessage = '';
    if (validationResult.servicio) {
        errorMessage += validationResult.servicio[0] + ' ';
    }
    if (validationResult.monto) {
        errorMessage += validationResult.monto[0];
    }
    Swal.fire({
        title: 'Error',
        text: errorMessage || 'Por favor, corrige los errores.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}
