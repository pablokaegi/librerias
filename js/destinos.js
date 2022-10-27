const dondeViajo = [
    {
        "pais": "Argentina",
        "destino": "Salta",
        "precio_dia": 58093
    },
    {
        "pais": "Argentina",
        "destino": "Formosa",
        "precio_dia": 53055
    },
    {
        "pais": "Uruguay",
        "destino": "Punta del Este",
        "precio_dia": 135000
    },
    {
        "pais": "Brasil",
        "destino": "Rio de Janeiro",
        "precio_dia": 237000
    },
    {
        "pais": "Argentina",
        "destino": "Mendoza",
        "precio_dia": 50780
    },
    {
        "pais": "Brasil",
        "destino": "Sao Pablo",
        "precio_dia":320547
    }
]


// Constructor Viaje
class viaje {
    constructor(pais, destino, fechaIda, fechaVuelta, cantPasajeros, categoria, precio) {
        this.pais = pais;
        this.destino = destino;
        this.fechaIda = fechaIda;
        this.fechaVuelta = fechaVuelta;
        this.cantPasajeros = cantPasajeros;
        this.categoria = categoria;
        this.precio = precio;
    }
}


// Genero listado para los select
function crearListado(array, parametro) {
    const listado = [];

    array.forEach(elemento => {
        if (!listado.includes(elemento[parametro])) {
            listado.push(elemento[parametro]);
        }
    })
    return listado.sort();
}

// Cargo contenido en los Select
function cargarSelect(array, select) {
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element.toLowerCase().replace(' ', '-');
        option.textContent = element;
        select.appendChild(option);
    })
}

document.addEventListener('DOMContentLoaded', cargarDatos);
//Cargando datos del viaje
function cargarDatos() {
    // Variales del proyecto
    const selectPais = document.querySelector('#pais');
    const selectDestino = document.querySelector('#destino');
    const calendarioIda = document.querySelector('#start');
    const calendarioVuelta = document.querySelector('#end');
    const selectPasajeros = document.querySelector('#pasaj');
    const selectCategoria = document.querySelector('#selectCategoria');

    const calcularViaje = document.querySelector('#btnCalcular');
    const resultadoViaje = document.querySelector('#listaViaje');
    const sumaTotal = document.querySelector('#sumaTotal');



    const paises = crearListado(dondeViajo, "pais");

    cargarSelect(paises, selectPais);

    selectPais.addEventListener('change', function (e) {
        selectDestino.innerHTML = '<option value=""> -- Seleccionar -- </opcion>';

        const destinos = dondeViajo.filter(elem => elem.pais.toLocaleLowerCase().replace(' ', '-') == e.target.value);

        const listaDestinos = crearListado(destinos, "destino");

        cargarSelect(listaDestinos, selectDestino)
    });


    calcularViaje.addEventListener('focus', calcularDatos);

    function calcularDatos(e) {
        e.preventDefault();

        // Leer Pais Elegido
        var paisEleg = selectPais.value;
        // Leer Destino Elegido
        var destinoEleg = selectDestino.value;
        // Leer Fecha elegida
        var fechaIdaEleg = calendarioIda.value;
        var fechaVueltaEleg = calendarioVuelta.value;
        // Leer Cantidad de pasajeros
        var cantidadPasajeros = selectPasajeros.value;



        // Cantidad dias de viaje
        function restaFechas(f1, f2) {
            var fFecha1 = new Date(calendarioIda.value);
            var fFecha2 = new Date(calendarioVuelta.value);
            var dif = fFecha2 - fFecha1;
            var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
            return dias;
        }
        var diferenciaDias = restaFechas(calendarioIda.value, calendarioVuelta.value);

        // Buscar los precios
        precioDia = dondeViajo.find(elem => elem.destino.toLowerCase().replace(' ', '-') == destinoEleg)
        const precio_x_dia = precioDia.precio_dia;

        // Eligiendo la categoria
        var categEleg = selectCategoria.value;
        if (categEleg == "Business") {
            var categoriaElegida = 3
        } else {
            var categoriaElegida = 1
        }

        // Calculando Total
        var totalPagar = Math.round((precio_x_dia * diferenciaDias) * (cantidadPasajeros) * (categoriaElegida));

        // Creando un array para el resumen
        var listadoSeleccionado = [];

        listadoSeleccionado.push("PAIS: " + paisEleg);
        listadoSeleccionado.push("DESTINO: " + destinoEleg);
        listadoSeleccionado.push("FECHA DE IDA: " + fechaIdaEleg);
        listadoSeleccionado.push("FECHA DE VUELTA: " + fechaVueltaEleg);
        listadoSeleccionado.push("CANTIDAD DE PASAJEROS: " + cantidadPasajeros);
        listadoSeleccionado.push("CATEGORIA: " + categEleg);

        // Cargando resumen en el HTML 
        resultadoViaje.innerHTML = ''
        resultadoViaje.classList.add('resumen');
        for (var i = 0; i < listadoSeleccionado.length; i++) {
            resultadoViaje.innerHTML += listadoSeleccionado[i] + '</br>';
        }

        // Cargar total en HTML
        sumaTotal.innerHTML = "$ " + totalPagar;
        sumaTotal.classList.add('sumatotal');


        // Abre y cierra menu desplegable
        (function ($) {
            "use strict";
            var openBtn = $("#btnCalcular"),
                closeBtn = $("#close-button"),
                menu = $(".menu-wrap");
            // Open menu when click on menu button
            openBtn.on("click", function () {
                menu.addClass("active");
            });
            // Close menu when click on Close button
            closeBtn.on("click", function () {
                menu.removeClass("active");
            });

            var openBtn2 = $("#openBtn2");
            openBtn2.on('click', function () {
                menu.addClass('active');
                menu.show(storage);
            })
        })(jQuery);

        // Nuevo viaje se guarda en LocalStorage
        var nuevoViaje = new viaje(paisEleg, destinoEleg, fechaIdaEleg, fechaVueltaEleg, cantidadPasajeros, categEleg, totalPagar);
        localStorage.setItem('viaje', JSON.stringify(nuevoViaje));

        var storage = JSON.parse(localStorage.getItem('viaje'));


        //-------------------------------------------------------------------------------------//

       
        // Select del mes
        for (let i = 1; i <= 12; i++) {
            let opcion = document.createElement('option');
            opcion.value = i;
            opcion.innerText = i;
            formulario.selectMes.appendChild(opcion);
        }

        // Select del año 
        const yearActual = new Date().getFullYear();
        for (let i = yearActual; i <= yearActual + 8; i++) {
            let opcion = document.createElement('option');
            opcion.value = i;
            opcion.innerText = i;
            formulario.selectYear.appendChild(opcion);
        }

       
        //----------------------------------------------------------------------------------//
        
        const botonFinalizar = document.querySelector('#btn-finalizar');

        botonFinalizar.addEventListener('click', function () {
            const div = document.createElement('div');
            div.classList.add('mt-10', 'text-left');

            div.innerHTML = `
                <p>Compra exitosa</p>
                `;

            const resultadoTajeta = document.querySelector('#resultado');
            // Mostrar el spinner
            const spinner = document.querySelector('#cargando');
            spinner.style.display = 'flex';

            setTimeout(() => {
                spinner.style.display = 'none';
                resultadoTajeta.appendChild(div);
            }, 3000);
        })
    }
}

