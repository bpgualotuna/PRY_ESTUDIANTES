let notas = [8, 4, 10, 6, 3, 9, 5, 7, 2];

let contadorAprobados = 0;
let contadorSupletorio = 0;
let contadorReprobados = 0;

let sumaNotas = 0;

function clasificarNota(nota) {
    if (nota >= 7 && nota <= 10) {
        return 'Aprobado';
    } else if (nota >= 5 && nota <= 6) {
        return 'Supletorio';
    } else if (nota >= 0 && nota <= 4) {
        return 'Reprobado';
    } else {
        return 'Nota inválida';
    }
}


function obtenerBg(clasificacion) {
    switch (clasificacion) {
        case 'Aprobado':
            return 'bg-success';
        case 'Supletorio':
            return 'bg-warning text-dark';
        case 'Reprobado':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}


function procesarNotas() {

    contadorAprobados = 0;
    contadorSupletorio = 0;
    contadorReprobados = 0;
    sumaNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        let nota = notas[i];

        sumaNotas += nota;

        if (nota >= 7 && nota <= 10) {
            contadorAprobados++;
        } else if (nota >= 5 && nota <= 6) {
            contadorSupletorio++;
        } else if (nota >= 0 && nota <= 4) {
            contadorReprobados++;
        }
    }
}

function calcularPromedio() {
    if (notas.length === 0) {
        return 0;
    }
    return sumaNotas / notas.length;
}

function determinarEstadoCurso(promedio) {
    if (promedio >= 7) {
        return 'APROBADO';
    } else {
        return 'EN RIESGO';
    }
}

function actualizarInterfaz() {
    document.getElementById('total-aprobados').textContent = contadorAprobados;
    document.getElementById('total-supletorio').textContent = contadorSupletorio;
    document.getElementById('total-reprobados').textContent = contadorReprobados;

    const promedio = calcularPromedio();
    document.getElementById('promedio-curso').textContent = promedio.toFixed(2);

    const estadoCurso = determinarEstadoCurso(promedio);
    const estadoElement = document.getElementById('estado-curso');
    const estadoContainer = document.getElementById('estado-curso-container');

    estadoElement.textContent = estadoCurso;

    if (estadoCurso === 'APROBADO') {
        estadoContainer.classList.remove('estado-riesgo');
        estadoContainer.classList.add('estado-aprobado');
    } else {
        estadoContainer.classList.remove('estado-aprobado');
        estadoContainer.classList.add('estado-riesgo');
    }


    llenarTablaNotas();
}


function llenarTablaNotas() {
    const tablaBody = document.getElementById('tabla-notas');
    tablaBody.innerHTML = '';

    notas.forEach((nota, index) => {
        const clasificacion = clasificarNota(nota);
        const claseBg = obtenerBg(clasificacion);

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="text-center fw-bold">${index + 1}</td>
            <td class="text-center">Estudiante ${index + 1}</td>
            <td class="text-center">
                <span class="badge bg-primary badge-custom">${nota}</span>
            </td>
            <td class="text-center">
                <span class="badge ${claseBg} badge-custom">
                    ${clasificacion}
                </span>
            </td>
        `;

        tablaBody.appendChild(fila);
    });
}

function inicializar() {
    console.log('=== Sistema de Clasificación de Notas ===');
    console.log('Notas originales:', notas);

    procesarNotas();


    console.log('\n--- Resultados ---');
    console.log('Total de Aprobados:', contadorAprobados);
    console.log('Total de Supletorio:', contadorSupletorio);
    console.log('Total de Reprobados:', contadorReprobados);

    const promedio = calcularPromedio();
    console.log('Promedio del curso:', promedio.toFixed(2));

    const estadoCurso = determinarEstadoCurso(promedio);
    console.log('Estado del curso:', estadoCurso);


    actualizarInterfaz();
}


document.addEventListener('DOMContentLoaded', inicializar);
