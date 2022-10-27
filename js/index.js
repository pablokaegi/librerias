

let boton2=document.getElementById('boton2');
boton2.addEventListener('click', () => {
Swal.fire({
    title: 'Está seguro que quiere agregar el paquete a su carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    cancelButtonText: 'No, no quiero'
}).then((result) => {

    if (result.isConfirmed) {
        Swal.fire({
            title: 'Estas muy cerca de conseguir tu viaje favorito!',
            icon: 'success',
            text: 'Solo falta un paso más'
        })
    }
})
})
let boton3=document.getElementById('boton3');
boton3.addEventListener('click', () => {
Swal.fire({
    title: 'Está seguro que quiere agregar el paquete a su carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    cancelButtonText: 'No, no quiero'
}).then((result) => {

    if (result.isConfirmed) {
        Swal.fire({
            title: 'Estas muy cerca de conseguir tu viaje favorito!',
            icon: 'success',
            text: 'Solo falta un paso más'
        })
    }
})
})

/*Definimos constantes para el formulario */
const boton = document.getElementById("boton");

boton.addEventListener("click", prevent)

function prevent(event){
    event.preventDefault()
}


const lugar = document.getElementById("lugar");
const pasajeros = document.getElementById("pasajeros");


const impuesto = 1.21;

function calcularViaje(lugar, pasajeros) {

    let lugarExiste = false;

    for (elemento of lugares){
 
        if(lugar.value == elemento.lugar){

            // En el caso de que el lugar introducido en el formulario sea igual al nombre del elemento
            // se ejecutarán 2 operaciones matemáticas: el precio incluyendo impuestos y luego se multiplica
            // por la cantidad de pasajeros y se guardará el resultado en la variable local "total". 
            // luego se mostrará un alert mostando dicha variable
            let total = (elemento.precio * impuesto) * pasajeros.value;
            alert(total.toFixed(2));

            // Como verificamos que el lugar si existe e incluso ya operamos con su precio, cambiamos el valor
            // de "lugarExiste" a "true" para evitar la notificación del error.
            lugarExiste = true;
        }
    }

    // Si el lugar introducido no existe, no cambia la variable "lugarExiste", por lo cual
    // en ese caso, ejecutarémos una alerta notificanto que el lugar no existe
    if(!lugarExiste){
        alert("Este lugar no existe en nuestro sitio")
    }
}


function mostrarPrecioViaje(){
    calcularViaje(
        lugar,
        pasajeros
    );
}

boton.addEventListener("click", mostrarPrecioViaje);

 // Crea un mapa y inicializa su posición y escala
 var map = L.map('miMapa').setView([39.57, 3.0], 8);

 // Crea capa openstreetmap y la añade al mapa
 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
 }).addTo(map);

 // Crea control de escala y lo añade al mapa
 L.control.scale({
   imperial: false
 }).addTo(map);